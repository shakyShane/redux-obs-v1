import {TestScheduler} from "rxjs/testing";
import {cancel, fetchFailed, fetchFulfilled, reset, search, setStatus} from "../../reducers/beersActions";
import {of} from "rxjs";
import {initialState} from "../../reducers/configReducer";
import {fetchBeersEpic} from "../fetchBeers";

it("produces correct actions (success)", function() {
    const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('a', {
            a: search("ship")
        });
        const state$ = of({
            config: initialState
        });
        const dependencies = {
            getJSON: (url) => {
                return cold('-a', {
                    a: [{name: "Beer 1"}]
                })
            }
        };
        const output$ = fetchBeersEpic(action$, state$, dependencies);
        expectObservable(output$).toBe('500ms ab', {
            a: setStatus("pending"),
            b: fetchFulfilled([{name: "Beer 1"}])
        })
    })
});
it("produces correct actions (error)", function() {
    const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('a', {
            a: search("ship")
        });
        const state$ = of({
            config: initialState
        });
        const dependencies = {
            getJSON: (url) => {
                return cold('-#', null, {
                    response: {
                        message: "oops!"
                    }
                })
            }
        };
        const output$ = fetchBeersEpic(action$, state$, dependencies);
        expectObservable(output$).toBe('500ms ab', {
            a: setStatus("pending"),
            b: fetchFailed("oops!")
        })
    })
});


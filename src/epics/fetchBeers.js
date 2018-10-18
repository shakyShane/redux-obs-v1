import {ajax} from "rxjs/ajax";
import {catchError, debounceTime, filter, map, mapTo, pluck, switchMap, withLatestFrom} from "rxjs/operators";
import {SEARCH, fetchFulfilled, setStatus, fetchFailed, CANCEL, reset} from "../reducers/beersActions";
import {ofType} from "redux-observable";
import {concat, fromEvent, of, merge, race} from "rxjs";

const search = (apiBase, perPage, term) =>
    `${apiBase}?beer_name=${encodeURIComponent(term)}&per_page=${perPage}`;

export function fetchBeersEpic(action$, state$) {
    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
        filter(({payload}) => payload.trim() !== ""),
        withLatestFrom(state$.pipe(pluck("config"))),
        switchMap(([{payload}, config]) => {

            const ajax$ = ajax.getJSON(search(config.apiBase, config.perPage, payload)).pipe(
                map(resp => fetchFulfilled(resp)),
                catchError(err => {
                    return of(fetchFailed(err.response.message));
                })
            );

            const blocker$ = merge(
                action$.pipe(ofType(CANCEL)),
                fromEvent(document, "keyup").pipe(
                    filter(evt => evt.key === "Escape" || evt.key === "Esc")
                )
            ).pipe(mapTo(reset()));

            return concat(
                of(setStatus("pending")),
                race(ajax$, blocker$)
            )
        })
    );
}

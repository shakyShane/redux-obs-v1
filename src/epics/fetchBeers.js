import {ajax} from "rxjs/ajax";
import {catchError, debounceTime, delay, filter, map, mapTo, switchMap} from "rxjs/operators";
import {SEARCH, fetchFulfilled, setStatus, fetchFailed, CANCEL, reset} from "../reducers/beersActions";
import {ofType} from "redux-observable";
import {concat, fromEvent, of, merge, race} from "rxjs";

const API = 'https://api.punkapi.com/v2/beers';
const search = (term) => `${API}?beer_name=${encodeURIComponent(term)}`;

export function fetchBeersEpic(action$) {
    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
        filter(({payload}) => payload.trim() !== ""),
        switchMap(({payload}) => {

            const ajax$ = ajax.getJSON(search(payload)).pipe(
                delay(5000),
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

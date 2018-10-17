import {ajax} from "rxjs/ajax";
import {catchError, debounceTime, filter, map, switchMap} from "rxjs/operators";
import {SEARCH, fetchFulfilled, setStatus, fetchFailed} from "../reducers/beersActions";
import {ofType} from "redux-observable";
import {concat, of} from "rxjs";

const API = 'https://api.punkapi.com/v2/beers';
const search = (term) => `${API}?beer_name=${encodeURIComponent(term)}`;

export function fetchBeersEpic(action$) {
    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
        // filter(({payload}) => payload.trim() !== ""),
        switchMap(({payload}) => {
            return concat(
                of(setStatus("pending")),
                ajax.getJSON(search(payload)).pipe(
                    map(resp => fetchFulfilled(resp)),
                    catchError(err => {
                        return of(fetchFailed(err.response.message));
                    })
                )
            )
        })
    );
}

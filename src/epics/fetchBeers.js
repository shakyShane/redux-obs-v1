import {ajax} from "rxjs/ajax";
import {map} from "rxjs/operators";
import {fetchFulfilled} from "../reducers/beersActions";
const API = 'https://api.punkapi.com/v2/beers';

export function fetchBeersEpic() {
    return ajax.getJSON(API).pipe(
        map(resp => fetchFulfilled(resp))
    )
}

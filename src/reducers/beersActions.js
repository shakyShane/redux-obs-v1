export const FETCH_FULFILLED = "FETCH_FULFILLED";

export function fetchFulfilled(beers) {
    return {
        type: FETCH_FULFILLED,
        payload: beers
    }
}

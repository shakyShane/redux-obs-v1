export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const FETCH_FAILED = "FETCH_FAILED";
export const SET_STATUS = "SET_STATUS";
export const FETCH_DATA = "FETCH_DATA";
export const SEARCH = "SEARCH";

export function fetchFulfilled(beers) {
    return {
        type: FETCH_FULFILLED,
        payload: beers
    }
}

export function fetchFailed(message) {
    return {
        type: FETCH_FAILED,
        payload: message
    }
}

export function setStatus(status) {
    return {
        type: SET_STATUS,
        payload: status
    }
}

export function fetchData() {
    return {
        type: FETCH_DATA
    }
}

export function search(input) {
    return {
        type: SEARCH,
        payload: input
    }
}

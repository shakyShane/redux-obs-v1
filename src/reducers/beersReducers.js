import {FETCH_FULFILLED} from "./beersActions";

const initialState = {
    data: [],
    loading: true
};

export function beersReducers(state = initialState, action) {
    switch (action.type) {
        case FETCH_FULFILLED: {
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        }
        default: return state;
    }
}

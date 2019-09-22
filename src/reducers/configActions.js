export const SET_CONFIG = "SET_CONFIG";

export function setConfig(partialObject) {
    return {
        type: SET_CONFIG,
        payload: partialObject,
    }
}

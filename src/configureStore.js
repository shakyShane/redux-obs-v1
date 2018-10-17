import {createStore, combineReducers, applyMiddleware} from "redux";
import {appReducer} from "./reducers/appReducer";

import {combineEpics, createEpicMiddleware} from "redux-observable";
import {of} from "rxjs";
import {delay} from "rxjs/operators";

const epic1 = () => of({type: "SET_NAME", payload: "Sally"}).pipe(delay(2000));

export function configureStore() {

    const rootEpic = combineEpics(epic1);

    const epicMiddleware = createEpicMiddleware();

    const rootReducer = combineReducers({
        app: appReducer
    });

    const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

    epicMiddleware.run(rootEpic);

    return store;
}

import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {appReducer} from "./reducers/appReducer";
import {ajax} from "rxjs/ajax";

import {combineEpics, createEpicMiddleware} from "redux-observable";
import {fetchBeersEpic} from "./epics/fetchBeers";
import {beersReducers} from "./reducers/beersReducers";
import {configReducer} from "./reducers/configReducer";
import {hydrateEpic, persistEpic} from "./epics/persist";

export function configureStore(dependencies = {}) {

    const rootEpic = combineEpics(fetchBeersEpic, persistEpic, hydrateEpic);

    const epicMiddleware = createEpicMiddleware({
        dependencies: {
            getJSON: ajax.getJSON,
            ...dependencies
        }
    });

    const rootReducer = combineReducers({
        app: appReducer,
        beers: beersReducers,
        config: configReducer
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(rootReducer, composeEnhancers(
        applyMiddleware(epicMiddleware)
    ));

    epicMiddleware.run(rootEpic);

    return store;
}

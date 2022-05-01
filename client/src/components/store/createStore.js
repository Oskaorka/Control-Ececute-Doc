import docDatasReducer from "./docData";
import executorReducer from "./executor";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    docDatas: docDatasReducer,
    executors: executorReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}

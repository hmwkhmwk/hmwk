import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import hash from "./hash";
// import student from "./singleStudent";
// import homework from "./singleHomework";
// import homeworks from "./homeworks";

const reducer = combineReducers({ hash });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
// export * from "./singleStudent";

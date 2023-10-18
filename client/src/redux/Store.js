import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import Reducer from "./Reducer.js";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Store = createStore(
  Reducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default Store;

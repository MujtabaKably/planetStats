import { createStore, applyMiddleware } from "redux";

import { routerMiddleware } from "react-router-redux";
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';

import reducers from "./modules/app/combineReducers.js";

window.History = createHistory();

const reduxRouterMW = routerMiddleware(History);

const setStore = (defaultState = {}) => {
  return createStore(reducers, defaultState, applyMiddleware(thunk, reduxRouterMW, createLogger({
    level: 'info',
    collapsed: true
  })));
}

export default setStore;
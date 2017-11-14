import { createStore, applyMiddleware, combineReducers } from 'redux';
import Immutable from 'immutable';
import { createLogger } from 'redux-logger';
import dynamicMiddlewares from 'redux-dynamic-middlewares'
import socketProxy from './reduxSocketMiddleware';
import chat from './chat';

const store = createStore(
    chat,
    applyMiddleware(logger, socketProxy)
);

export default store;

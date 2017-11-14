import { OrderedMap } from 'immutable';
import { combineReducers } from 'redux';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_ADD = 'USER_ADD';
export const USER_REGISTER = 'USER_REGISTER';
export const SET_USER_OFFLINE = 'SET_USER_OFFLINE';
export const MESSAGE_ADD = 'MESSAGE_ADD';
export const MESSAGE_SEND = 'MESSAGE_SEND';
export const CONNECT_WITH_USER = 'CONNECT_WITH_USER';
export const OPERATOR_CONNECTED = 'OPERATOR_CONNECTED';
export const REQUEST_MASSAGES_HISTORY = 'REQUEST_MASSAGES_HISTORY';

export class Message {
    constructor(text) {
        this.timestamp = new Date().getTime();
        this.userId = null;
        this.text = text;
    }
}

export class User {
    constructor(login) {
        this.login = login;
    }
}

export const socketAction = (action) => {
    Object.assign(action.meta, {
        proxyToSocket: true
    });
    return action;
};

export const sendMessage = (text) => ({
    type: MESSAGE_SEND,
    payload: new Message(text)
});

export const addMessage = (message) => ({ type: ADD_MESSAGE, payload: message });
export const connectWithUser = (id) => ({ type: CONNECT_WITH_USER, payload: id });
export const addUser = (user) => ({ type: USER_ADD, payload: user }); 

const messagesInitialState = OrderedMap();

export const messagesReducer = (state = messagesInitialState, { type, payload }) => {
    switch (type) {
        case USER_ADD:
            return state.merge(payload.messages);
        case MESSAGE_ADD:
        case MESSAGE_SEND:
            return state.set(payload.timestamp, payload);
        default:
            return state;
    }
}

const usersInitialState = OrderedMap();

export const usersReducer = (state = usersInitialState, { type, payload }) => {
    switch (type) {
        case USER_ADD:
        case SET_USER_OFFLINE:
            return state.set(payload.login, payload)
        default:
            return state;
    }
}

export default combineReducers({
    users: usersReducer,
    messages: messagesReducer
});
import { OrderedMap } from 'immutable';
import { combineReducers } from 'redux';

export const USER_ADD = 'USER_ADD';
export const USER_SIGN_UP = 'USER_SIGN_UP';
export const USER_SIGN_IN = 'USER_SIGN_IN';
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
    constructor({ socketId, login }) {
        this.login = login ? login : socketId;
        this.socketId = socketId;
        this.isLoggedIn = this.login !== socketId;
    }
}

export const Actions = {
    sendMessage: (text) => ({ type: MESSAGE_SEND, payload: new Message(text) }),
    addMessage: (message) => ({ type: MESSAGE_ADD, payload: message }),
    connectWithUser: (id) => ({ type: CONNECT_WITH_USER, payload: id }),
    addUser: (socketId) => ({ type: USER_ADD, payload: new User({ socketId }) }),
    signIn: (socketId, login) => ({ type: USER_SIGN_IN, payload: { socketId, login } }),
    signUp: (login) => ({ type: USER_SIGN_UP, payload: { login } })
};

const messagesInitialState = OrderedMap();

export const messagesReducer = (state = messagesInitialState, { type, payload }) => {
    switch (type) {
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
        case USER_SIGN_IN:
            return state
                .set(payload.login, payload)
                .remove(payload.socketId);
        case USER_ADD:
        case SET_USER_OFFLINE:
            return state.set(payload.login, payload);
        default:
            return state;
    }
}

export default combineReducers({
    users: usersReducer,
    messages: messagesReducer
});
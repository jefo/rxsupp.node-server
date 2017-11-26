import { OrderedMap, fromJS } from 'immutable';
import { combineReducers, bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

export const CHAT_UPDATE = 'CHAT_UPDATE';
export const CHAT_READY = 'CHAT_READY';
export const CHAT_INIT = 'CHAT_INIT';
export const USER_ADD = 'USER_ADD';
export const USER_UPDATE = 'USER_UPDATE';
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
    constructor(attrs) {
        this.login = attrs.login ? attrs.login : attrs.socketId;
        this.socketId = attrs.socketId;
        this.isLoggedIn = this.login !== attrs.socketId;
        this.status = 'online';
        this.roomId = attrs.roomId
    }
}

export const Actions = (room) => ({
    addMessage: (message) => ({ type: MESSAGE_ADD, payload: message, meta: { room, event: MESSAGE_ADD } }),
    connectWithUser: (id) => ({ type: CONNECT_WITH_USER, payload: id }),
    addUser: (user) => {
        return { type: USER_ADD, payload: new User(user), meta: { room, event: USER_ADD } }
    },
    updateUser: (user) => ({ payload: user, type: USER_UPDATE, meta: { room, event: USER_UPDATE } }),
    signIn: (socketId, login) => ({ type: USER_SIGN_IN, payload: { socketId, login }, meta: { room, event: USER_UPDATE } }),
    signUp: (login) => ({ type: USER_SIGN_UP, payload: { login } }),
    init: (socketId, users, messages) => {
        let user = new User({ socketId });
        return { type: CHAT_READY, payload: { user, users, messages }, meta: { room, event: CHAT_READY } };
    }
});

export const createChat = (dispatch, room) => {
    let actions = bindActionCreators(Actions(room), dispatch);
    return Object.assign({}, actions, {
        selectAll: createSelector(
            state => state.users,
            state => state.messages,
            (users, messages) => {
                return {
                    users: users.filter(user => user.get('status') !== 'offline').toJS(),
                    messages: messages.toJS()
                };
            }
        )
    });
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
                .set(payload.login, fromJS(payload))
                .remove(payload.socketId);
        case USER_ADD: 
            let addKey = payload.login ? payload.login : payload.socketId;
            return state.set(addKey, OrderedMap(payload));
        case USER_UPDATE:
            let key = payload.login ? payload.login : payload.socketId;
            return state.update(key, user => {
                if (!user.merge) {
                    user = fromJS(user)
                }
                console.log('wtf', state);
                return user.merge(fromJS(payload))
            });
        default:
            return state;
    }
}

export default combineReducers({
    users: usersReducer,
    messages: messagesReducer
});

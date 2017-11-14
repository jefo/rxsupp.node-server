const io = require('socket.io')(3000);
import { addMiddleware } from 'redux-dynamic-middlewares';

import {
    addUser,
    SEND_MESSAGE,
    ADD_MESSAGE,
    USER_LOGIN,
    USER_REGISTER,
    USER_ADD
} from './chat';

export function sendMessage(message) {
    io.to(message.room).emit(SEND_MESSAGE, message);
    store.dispatch({ type: ADD_MESSAGE }, message);
}

export function login(user) {
    io.to(message.room).emit(USER_ADD, user);
    store.dispatch({ type: USER_ADD }, user);
}

export function register(user) {
    store.dispatch({ type: USER_REGISTER }, user);
    login(user);
}

const startServer = (io, socket) => {
    socket.on(USER_LOGIN, login);
    socket.on(USER_ADD, register);
    socket.on(USER_REGISTER, login);
};

io.on('connection', startServer);

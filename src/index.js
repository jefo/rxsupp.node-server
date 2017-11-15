import store from './store';
const io = require('socket.io')(3000);

import {
    Actions,
    User,
    MESSAGE_ADD,
    USER_SIGN_IN,
    MESSAGE_SEND
} from './chat';

const server = (io, socket) => {

    function addUser(socketId) {
        store.dispatch(Actions.addUser(socketId));
    }

    function sendMessage(message) {
        const action = Actions.addMessage(message);
        io.to(message.room).emit(MESSAGE_ADD, action.payload);
        store.dispatch(action);
    }

    function signIn(login) {
        const action = Actions.signIn(login);
        io.to(message.room).emit(USER_ADD, action.payload);
        store.dispatch(action);
    }

    addUser(socket.id);

    socket.on(MESSAGE_SEND, sendMessage);
    socket.on(USER_SIGN_IN, signIn);
};

io.on('connection', (socket) => {
    server(io, socket);
});

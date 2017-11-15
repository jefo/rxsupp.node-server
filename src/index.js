import store from './store';

import {
    service as chat,
    USER_SIGN_IN,
    MESSAGE_SEND
} from './chat';

const io = require('socket.io')(3000);

const server = (io, socket) => {
    chat.addUser(socket.id);
    socket.on(MESSAGE_SEND, chat.sendMessage);
    socket.on(USER_SIGN_IN, chat.signIn);
};

io.on('connection', (socket) => {
    server(io, socket);
});

export default io;
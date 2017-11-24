import {
    createChat,
    USER_SIGN_IN,
    MESSAGE_SEND
} from './chat';
import store from './store';

const io = require('socket.io')(3000);

const server = (io, socket) => {
    let ticketId = new Date().getTime().toString();
    socket.join(ticketId);
    const chat = createChat(store.dispatch, ticketId);
    chat.init(socket.id);
    socket.on(MESSAGE_SEND, chat.sendMessage);
    socket.on(USER_SIGN_IN, chat.signIn);
};

io.on('connection', (socket) => {
    server(io, socket);
});

export default io;
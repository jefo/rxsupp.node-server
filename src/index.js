import {
    createChat,
    USER_SIGN_IN,
    MESSAGE_SEND,
    CHAT_READY,
    CHAT_INIT,
    USER_ADD
} from './chat';
import store from './store';

const io = require('socket.io')(3000);
let ticketId = new Date().getTime().toString();

const server = (io, socket) => {
    socket.join(ticketId);
    const chat = createChat(store.dispatch, ticketId);
    chat.addUser({ socketId: socket.id, roomId: ticketId });
    let payload = chat.selectAll(store.getState());
    payload.socketId = socket.id;
    console.log('init', payload);
    socket.emit(CHAT_INIT, payload);
    socket.on(MESSAGE_SEND, (message) => {
        message.socketId = socket.id;
        message.roomId = ticketId;
        chat.addMessage(message);
    });
    socket.on(USER_SIGN_IN, chat.signIn);
    socket.on('disconnect', () => chat.updateUser({ socketId: socket.id, status: 'disconnect' }));
};

io.on('connection', (socket) => {
    server(io, socket);
});

export default io;
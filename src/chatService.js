export const socketAction = (action) => {
    Object.assign(action.meta, {
        proxyToSocket: true
    });
    return action;
}

export default class ChatService {

    constructor(socket, store) {
        this.socket = socket;
        this.store = store;
    }

    sendMessage(text) {
        
    }

    login() {

    }

    connect() {

    }

    dissconnect() {

    }
}

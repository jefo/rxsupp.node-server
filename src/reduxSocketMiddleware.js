// import

export default socket => store => next => action => {
    if (action.meta && action.meta.proxyToSocket) {
        socket.emit(action.type, action.payload);
    }
    return next(action);
};

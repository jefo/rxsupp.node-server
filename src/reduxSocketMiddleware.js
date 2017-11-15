import io from './index';

export default store => next => action => {
    if (action.meta && action.meta.emit) {
        let { room, event } = action.meta.emit;
        io.to(room).emit(event, action.payload);
    }

    return next(action);
};

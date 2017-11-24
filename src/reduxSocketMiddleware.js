import io from './index';

export default store => next => action => {
    if (action.meta) {
        let { room, event } = action.meta;
        io.to(room).emit(event, action.payload);
    }
    return next(action);
};

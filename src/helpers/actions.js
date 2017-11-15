import store from '../store';

const bindActionCreator = action => payload => store.dispatch(action(payload));

export const createService = (actions) => Object.keys(actions).reduce((acc, key) => {
    acc[key] = bindActionCreator(actions[key]);
    return acc;
}, {});

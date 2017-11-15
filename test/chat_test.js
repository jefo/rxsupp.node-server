import assert from 'assert';
import { OrderedMap } from 'immutable';
import {
  messagesReducer,
  usersReducer,
  Actions,
  Message,
  User
} from '../src/chat';

describe('chat', () => {

  let chatActions = Actions('room1');

  it('sendMessage', () => {
    let messageAction = chatActions.sendMessage('привет');
    assert.deepEqual(messageAction, {
      type: 'MESSAGE_SEND',
      payload: messageAction.payload,
      meta: { room: 'room1', event: 'MESSAGE_ADD' }
    });
  });

  it('MESSAGE_SEND', () => {
    let messageAction = chatActions.sendMessage('привет');
    let state = messagesReducer(OrderedMap(), messageAction);
    let expectedState = {
      [messageAction.payload.timestamp]: messageAction.payload
    };
    assert.deepEqual(state.toJS(), expectedState);
  });

  it('USER_ADD', () => {
    const action = chatActions.addUser('login');
    assert.deepEqual(action, {
      type: 'USER_ADD',
      payload: { login: 'login', isLoggedIn: false, socketId: 'login' }
    });
    let state = usersReducer(OrderedMap(), action);
    let expectedState = {
      [action.payload.login]: action.payload
    };
    assert.deepEqual(state.toJS(), expectedState);
  });

  it('signIn', () => {
    const action = chatActions.signIn(123, 'login');
    assert.deepEqual(action, {
      type: 'USER_SIGN_IN',
      payload: { socketId: 123, login: 'login' },
      meta: { room: 'room1', event: 'USER_ADD' }
    });
  });

  it('USER_SIGN_IN', () => {
    const action = chatActions.signIn('123', 'login');
    let initialState = OrderedMap({
      [action.payload.socketId]: action.payload
    });
    let state = usersReducer(initialState, action);
    let expectedState = {
      [action.payload.login]: action.payload
    };
    assert.deepEqual(state.toJS(), expectedState);
  });
});

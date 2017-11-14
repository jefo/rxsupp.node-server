import assert from 'assert';
import { OrderedMap } from 'immutable';
import {
  messagesReducer,
  usersReducer,
  sendMessage,
  addMessage,
  addUser,
  MESSAGE_SEND,
  Message,
  User,
} from '../src/chat';

describe('chat', () => {

  it('sendMessage', () => {
    let messageAction = sendMessage('привет');
    assert.deepEqual(messageAction, {
      type: MESSAGE_SEND,
      payload: messageAction.payload
    });
  });

  it('MESSAGE_SEND', () => {
    let messageAction = sendMessage('привет');
    let state = messagesReducer(OrderedMap(), messageAction);
    let expectedState = {
      [messageAction.payload.timestamp]: messageAction.payload
    };
    assert.deepEqual(state.toJS(), expectedState);
  });

  it('USER_ADD', () => {
    const action = addUser(new User('user'));
    let state = usersReducer(OrderedMap(), action);
    let expectedState = {
      [action.payload.login]: action.payload
    };
    assert.deepEqual(state.toJS(), expectedState);
  });
});

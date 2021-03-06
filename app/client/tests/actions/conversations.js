import assert from 'assert'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import { TYPES, sendMessage } from '../../actions/conversations'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const API_HOST = 'http://localhost:9000/';

const message = {
  '_id' : '58bd7ba056c44c52e2105cfa',
  'createdAt' : '2017-03-06T15:09:20.879Z',
  'text' : 'dsfs',
  'author' : {
    '_id' : '58bd7b4856c44c52e2105cf6',
    'username' : 'volkol',
    'email' : 'volkol@dfs.dsf',
    'firstName' : '',
    'lastName' : '',
    'avatar' : 'http://localhost:9000/uploads/images/1488812880105Screenshotfrom2017-03-0401-24-01.png'
  },
  'updatedAt' : null
};

describe('conversation actions', () => {
  it('send message', () => {
    nock(API_HOST)
    .post('/api/conversations/1/messages', message)
    .reply(200, message);

    const store = mockStore()

    return store.dispatch(sendMessage(1, message))
    .then(() => {
      assert.deepEqual(store.getActions(), [{
        type: TYPES.SEND_MESSAGE,
        data: {
          conversationId: 1,
          message: message
        }
      }])
    });
  });

  it('send message fail', () => {
    nock(API_HOST)
    .post('/api/conversations/1/messages', message)
    .reply(500, {error: 'error'});

    const store = mockStore()

    return store.dispatch(sendMessage(1, message))
    .then(() => {
      assert.deepEqual(store.getActions(), [{
        type: TYPES.SEND_MESSAGE_FAIL,
        error: 'error'
      }])
    });
  });
});

import assert from 'assert'
import reducer from '../../reducers/conversations'
import { TYPES } from '../../actions/conversations'

const state = {
  conversations: [
    {
      _id: "58b45100a8a4fd349a573556",
      messages: [{
        _id: "58b45104a8a4fd349a573557",
        text: "1"
      }],
    },
    {
      _id: "58b45100a8a4fd349a573557",
      messages: [{
        _id: "58b45104a8a4fd349a573558",
        text: "10"
      }]
    }
  ],
  conversation: {
    _id: "58b45100a8a4fd349a573556",
    messages: [{
      _id: "58b45104a8a4fd349a573557",
      text: "1"
    }]
  }
};

describe('conversation reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(
      reducer(undefined, {}),
      {
        conversations: [],
        conversation: null
      }
    );
  });

  it('should handle EDIT_MESSAGE', () => {
    assert.deepEqual(
      reducer(
        state,
        {
          type: TYPES.EDIT_MESSAGE,
          data: {
            conversationId: "58b45100a8a4fd349a573556",
            message: {
              _id: "58b45104a8a4fd349a573557",
              text: "2",
            }
          }
        }
      ),
      {
        conversations: [
          {
            _id: "58b45100a8a4fd349a573556",
            messages: [{
              _id: "58b45104a8a4fd349a573557",
              text: "2"
            }],
          },
          {
            _id: "58b45100a8a4fd349a573557",
            messages: [{
              _id: "58b45104a8a4fd349a573558",
              text: "10"
            }]
          }
        ],
        conversation: {
          _id: "58b45100a8a4fd349a573556",
          messages: [{
            _id: "58b45104a8a4fd349a573557",
            text: "2",
          }],
        },

      }
    );
  });


  it('should processing REMOVE_MESSAGE', () => {
    assert.deepEqual(
      reducer(
        state,
        {
          type: TYPES.REMOVE_MESSAGE,
          data: {
            conversationId: "58b45100a8a4fd349a573556",
            messageId: "58b45104a8a4fd349a573557"
          }
        }
      ),
      {
        conversations: [
          {
            _id: "58b45100a8a4fd349a573556",
            messages: [],
          },
          {
            _id: "58b45100a8a4fd349a573557",
            messages: [{
              _id: "58b45104a8a4fd349a573558",
              text: "10"
            }]
          }
        ],
        conversation: {
          _id: "58b45100a8a4fd349a573556",
          messages: [],
        },

      }
    );
  });

});

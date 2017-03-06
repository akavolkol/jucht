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

  it('should processing SEND_MESSAGE', () => {
    const messages = [{
      _id: "58b45104a8a4fd349a573558",
      text: "10"
    },
    {
      "_id" : "58bd7ba056c44c52e2105cfa",
      "createdAt" : "2017-03-06T15:09:20.879Z",
      "text" : "dsfs",
      "author" : {
        "_id" : "58bd7b4856c44c52e2105cf6",
        "username" : "volkol",
        "email" : "volkol@dfs.dsf",
        "firstName" : "",
        "lastName" : "",
        "avatar" : "http://localhost:9000/uploads/images/1488812880105Screenshotfrom2017-03-0401-24-01.png"
      },
      "updatedAt" : null
    }
  ];

  assert.deepEqual(
    reducer(
      state,
      {
        type: TYPES.SEND_MESSAGE,
        data: {
          conversationId: '58b45100a8a4fd349a573557',
          message: {
            "_id" : "58bd7ba056c44c52e2105cfa",
            "createdAt" : "2017-03-06T15:09:20.879Z",
            "text" : "dsfs",
            "author" : {
              "_id" : "58bd7b4856c44c52e2105cf6",
              "username" : "volkol",
              "email" : "volkol@dfs.dsf",
              "firstName" : "",
              "lastName" : "",
              "avatar" : "http://localhost:9000/uploads/images/1488812880105Screenshotfrom2017-03-0401-24-01.png"
            },
            "updatedAt" : null
          }
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
          messages: messages
        }
      ],
      conversation: {
        _id: "58b45100a8a4fd349a573557",
        messages: messages,
      },

    }
  );
});

});

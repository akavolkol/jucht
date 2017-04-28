import { TYPES } from '../actions/conversations'

export const defaultState = {
  conversations: [],
  conversation: null,
  error: null
}

export default function conversations(state = defaultState, action) {
  let conversations, currentConversation;

  switch (action.type) {
    case TYPES.JOIN_CONVERSATION:
    return {
      ...state,
      conversations: state.conversations.concat(action.data)
    }

    case TYPES.OPEN_CONVERSATION:
      return {
        ...state,
        conversation: action.data,
        conversations: state.conversations.map((existed) => {
          if (existed._id == action.data._id) {
            existed = action.data;
          }
          return existed;
        })
      }

    case TYPES.RECEIVE_CONVERSATIONS:
      return {
        ...state,
        conversation: action.data.find((newest) => {
          return state.conversation ? newest._id == state.conversation._id : null;
        }),
        conversations: action.data
      }

    case TYPES.LEAVE_CONVERSATION:
    case TYPES.REMOVE_CONVERSATION:

      return {
        ...state,
        conversation: null,
        conversations: state.conversations.filter(conversation => {
          return conversation._id != action.data
        })
      }

    case TYPES.UNSET_CONVERSATION:
      return {
        ...state,
        conversation: null
      }

    case TYPES.SEND_MESSAGE:
      conversations = [...state.conversations];
      currentConversation = {};
      conversations.map(conversation => {
        if (conversation._id == action.data.conversationId) {
          conversation.messages.push(action.data.message);
          currentConversation = conversation;
        }
      });

      return {
        ...state,
        conversations: conversations,
        conversation: currentConversation
      }

    case TYPES.SEND_MESSAGE_FAIL:
      return {
        ...state,
        error: action.error
      }

    case TYPES.REMOVE_MESSAGE:
      conversations = [...state.conversations];

      conversations.map(conversation => {
        if (conversation._id == action.data.conversationId) {
          conversation.messages = conversation.messages.filter(message => {
            return message._id != action.data.messageId;
          });
          if (state.conversation._id == conversation._id) {
            currentConversation = conversation;
          }
        }
      });

      return {
        ...state,
        conversations: conversations,
        conversation: currentConversation
      }


      case TYPES.EDIT_MESSAGE:
        conversations = [...state.conversations];

        conversations.map(conversation => {
          if (conversation._id == action.data.conversationId) {
            conversation.messages = conversation.messages.map(message => {
              if (message._id == action.data.message._id) {
                message = action.data.message;
              }

              return message;
            });
            currentConversation = conversation;
          }
        });

        return {
          ...state,
          conversations: conversations,
          conversation: currentConversation
        }

    case TYPES.JOIN_CONVERSATION_FAIL:
    return state;

    default:
    return state;
  }
}

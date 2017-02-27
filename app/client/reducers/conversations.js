import { TYPES } from '../actions/conversations'

const defaultState = {
  conversations: [],
  conversation: null
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
        conversation: action.data
      }

    case TYPES.RECEIVE_CONVERSATIONS:
      return {
        ...state,
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
        params: {...state.params, username: ''},
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

    case TYPES.REMOVE_MESSAGE:
      conversations = [...state.conversations];
      currentConversation = {};

      conversations.map(conversation => {
        if (conversation._id == action.data.conversationId) {
          conversation.messages = conversation.messages.filter(message => {
            return message._id != action.data.messageId;
          });
          currentConversation = conversation;
        }
      });

      console.log(currentConversation)

      return {
        ...state,
        conversations: conversations,
        conversation: currentConversation
      }


      case TYPES.EDIT_MESSAGE:
        conversations = [...state.conversations];
        currentConversation = {};

        conversations.map(conversation => {
          if (conversation._id == action.data.conversationId) {
            currentConversation = conversation;
            currentConversation.messages = conversation.messages.map(message => {
              if (message._id == action.data.message._id) {
                return action.data.message;
              }

            });

          }
        });

        return {
          ...state,
          conversations: state.conversations,
          conversation: currentConversation
        }

    case TYPES.JOIN_CONVERSATION_FAIL:
    return state;

    default:
    return state;
  }
}

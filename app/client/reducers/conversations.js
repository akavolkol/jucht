import { TYPES } from '../actions/conversations'

const defaultState = {
  conversations: [],
  conversation: null
}

export default function converstaions(state = defaultState, action) {
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

      return {
        ...state,
        converstaion: null,
        conversations: state.conversations.filter(conversation => {
          conversation._id != action.data
        })
      }

    case TYPES.SEND_MESSAGE:
      let conversations = [...state.conversations];
      let currentConversation = {};

      conversations.map(conversation => {
        if (conversation._id == action.data.conversationId) {
          conversation.messages.push(action.data.message);
          currentConversation = conversation;
        }
      });

      return {
        ...state,
        conversations: conversations,
        converation: currentConversation
      }

    case TYPES.JOIN_CONVERSATION_FAIL:
    return state;

    default:
    return state;
  }
}

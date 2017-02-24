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

    case TYPES.JOIN_CONVERSATION_FAIL:
    return state;

    default:
    return state;
  }
}

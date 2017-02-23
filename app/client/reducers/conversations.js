import { TYPES } from '../actions/conversations'

const defaultState = {
  users: [],
  messages: []
}

export default function converstaions(state = defaultState, action) {
  switch (action.type) {
    case TYPES.JOIN_CONVERSATION:
    return {
      ...state,
      ...action.data
    }

    case TYPES.JOIN_CONVERSATION_FAIL:
    return state;

    default:
    return state;
  }
}

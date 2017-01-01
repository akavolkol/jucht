const defaultState = {
    flashMessages: []
}

export default function flashMessages(state = defaultState, action) {

    let flashMessages = state.flashMessages;

    switch (action.type) {
      case 'CREATE_MESSAGE':
        flashMessages.push(action.message);
        return {
          ...state,
          flashMessages
        }

      case 'GET_FLASH_MESSAGES':
        return {
          ...state
        }

      case 'DELETE_MESSAGE':
        flashMessages.splice(action.id, 1);
        return {
          ...state
        }

      default:
        return state;
    }
}

import { request } from '../utils/api'

export const TYPES = {
  MESSAGES_RECEIVED: 'MESSAGES_RECEIVED',
  MESSAGE_SEND: 'MESSAGE_SEND'
}

export function select(conversationId) {
    return dispatch => {
        request('/messages/' + conversationId, 'GET')
        .then(response =>
          {
            dispatch({ type: TYPES.MESSAGES_RECEIVED, data: response.messages });
          }
        );
      }
}

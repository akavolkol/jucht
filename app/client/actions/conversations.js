import { request } from '../utils/api'

export const TYPES = {
  JOIN_CONVERSATION: 'JOIN_CONVERSATION',
  JOIN_CONVERSATION_FAIL: 'JOIN_CONVERSATION_FAIL'
};

export function join(data) {
  return dispatch => {
    request('/conversations', 'POST', data)
    .then(response =>
      {
        dispatch({ type: TYPES.JOIN_CONVERSATION, data: response });
      },
      response => {
        dispatch({
          type: TYPES.JOIN_CONVERSATION_FAIL,
          error: response.message
        })
      }
    );
  }
}

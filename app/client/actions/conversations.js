import { request } from '../utils/api'

export const TYPES = {
  JOIN_CONVERSATION: 'JOIN_CONVERSATION',
  JOIN_CONVERSATION_FAIL: 'JOIN_CONVERSATION_FAIL',
  OPEN_CONVERSATION: 'OPEN_CONVERSATION',
  OPEN_CONVERSATION_FAIL: 'OPEN_CONVERSATION_FAIL',
  RECEIVE_CONVERSATIONS: 'RECEIVE_CONVERSATIONS',
  SEND_MESSAGE: 'SEND_MESSAGE',
  LEAVE_CONVERSATION: 'LEAVE_CONVERSATION'
};

export function join(conversation) {
  return (dispatch, getState) => {
    const state = getState();
    conversation = {
      ...conversation,
      ownerId: state.auth.user._id,
      participants: conversation.participants.concat([state.auth.user])

    }

    request('/conversations', 'POST', conversation)
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

export function list() {
  return dispatch => {
    request('/conversations', 'GET')
    .then(response =>
      {
        dispatch({ type: TYPES.RECEIVE_CONVERSATIONS, data: response });
      }
    );
  }
}

/**
 * Set active converation
 * @param  {string} slug id of converation
 * @return {[type]}
 */
export function openConversation(slug) {
  return (dispatch, getState) => {
    const state = getState();

    const conversationExisted = state.conversations.conversations.find((conversation) => {
      return conversation._id == slug;
    });

    if (conversationExisted) {
      dispatch({ type: TYPES.OPEN_CONVERSATION, data: conversationExisted });
    } else {
      request('/conversations/' + slug, 'GET')
      .then(response =>
        {
          dispatch({ type: TYPES.OPEN_CONVERSATION, data: response });
        },
        response => {
        }
      );
    }
  }
}

export function sendMessage(conversationId, message) {
  return dispatch => {
    request(`/conversations/${conversationId}/messages`, 'POST', message)
    .then(response =>
      {
        dispatch({
          type: TYPES.SEND_MESSAGE,
          data: {
            conversationId: conversationId,
            message: response
          }
        });
      },
      response => {
      }
    );
  }
}

export function leave(conversationId) {
  return (dispatch, getState) => {
    const state = getState();

    request(`/conversations/${conversationId}/leave`, 'PUT', {
      userId: state.auth.user._id
    })
    .then(response =>
      {
        dispatch({ type: TYPES.LEAVE_CONVERSATION, data: conversationId });
      },
      response => {
      }
    ).catch(e => new Error(e));
  }
}

import { request } from '../utils/api'

export const TYPES = {
  JOIN_CONVERSATION: 'JOIN_CONVERSATION',
  JOIN_CONVERSATION_FAIL: 'JOIN_CONVERSATION_FAIL',
  OPEN_CONVERSATION: 'OPEN_CONVERSATION',
  OPEN_CONVERSATION_FAIL: 'OPEN_CONVERSATION_FAIL',
  RECEIVE_CONVERSATIONS: 'RECEIVE_CONVERSATIONS',
  SEND_MESSAGE: 'SEND_MESSAGE',
  LEAVE_CONVERSATION: 'LEAVE_CONVERSATION',
  REMOVE_CONVERSATION: 'REMOVE_CONVERSATION',
  UNSET_CONVERSATION: 'UNSET_CONVERSATION',
  REMOVE_MESSAGE: 'REMOVE_MESSAGE',
  EDIT_MESSAGE: 'EDIT_MESSAGE'
};

export function join(conversation) {
  return (dispatch, getState) => {
    const state = getState();
    let isExistedConversation = state.conversations.conversations.find(conversationChecked => {
      return conversationChecked.participants.find(participant => {
        return participant._id == conversation.participants[0]._id;
      });
    });

    if (isExistedConversation) {
      return dispatch({ type: TYPES.OPEN_CONVERSATION, data: isExistedConversation });
    }

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
        }
      )
      .catch(error => {
        dispatch({ type: TYPES.UNSET_CONVERSATION });
      });
    }
  }
}


export function getConversation(slug) {
  return dispatch => {
      request('/conversations/' + slug, 'GET')
      .then(response =>
        {
          dispatch({ type: TYPES.OPEN_CONVERSATION, data: response });
        }
      )
      .catch(error => {

      });
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

export function editMessage(conversationId, messageId, message) {
  return dispatch => {
    request(`/conversations/${conversationId}/messages/${messageId}`, 'PUT', message)
    .then(response => {
      dispatch({
        type: TYPES.EDIT_MESSAGE,
        data: {
          conversationId: conversationId,
          message: response
        }
      });
    });
  }
}

export function removeMessage(conversationId, messageId) {
  return dispatch => {
    request(`/conversations/${conversationId}/messages/${messageId}`, 'DELETE')
    .then(response => {
      dispatch({
        type: TYPES.REMOVE_MESSAGE,
        data: {
          conversationId: conversationId,
          messageId: messageId
        }
      });
    });
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

export function remove(conversationId) {
  return (dispatch, getState) => {
    const state = getState();

    request(`/conversations/${conversationId}`, 'DELETE')
    .then(() =>
      {
        dispatch({ type: TYPES.REMOVE_CONVERSATION, data: conversationId });
      }
    ).catch(e => new Error(e));
  }
}

export function unsetActiveConversation() {
  return dispatch => dispatch({ type: TYPES.UNSET_CONVERSATION });
}

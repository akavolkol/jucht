export function createFlashMessage(message) {
  return dispatch => {
    dispatch({
      type: 'CREATE_MESSAGE',
      message: message
    })
  }
}

export function loadFlashMessages() {
  return dispatch => {
    dispatch({
      type: 'GET_FLASH_MESSAGES'
    })
  }
}

export function deleteFlashMessage(id) {
  return dispatch => {
    dispatch({
      type: 'DELETE_MESSAGE',
      id: id
    })
  }
}

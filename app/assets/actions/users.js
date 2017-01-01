import { request } from '../utils/api'

export const TYPES = {
  USERS_RECEIVED: 'USERS_RECEIVED',
  USERS_NOT_RECIVED: 'USERS_NOT_RECIVED',
}

export function select() {
    return dispatch => {
        request('/users/', 'GET')
        .then(response =>
          {
            dispatch({ type: TYPES.USERS_RECEIVED, data: response.users });
          }
        );
      }
}

export function search(query) {
    return dispatch => {
        request('/users', 'GET', {query: query})
        .then(data =>
          {
            dispatch({ type: TYPES.USERS_RECEIVED, data: data });
          },
          (data) => dispatch({ type: TYPES.USERS_NOT_RECIVED, data: data })
        );
      }
}

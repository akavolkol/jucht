import { request } from '../utils/api'

export const TYPES = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  SET_VISIBILITY_FILTER: 'SET_VISIBILITY_FILTER',
  AUTH_USER: 'AUTH_USER',
  UNAUTH_USER: 'UNAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_DATA: 'FETCH_DATA',
  FETCH_JSON: 'FETCH_JSON',
  RECEIVE_SESSION: 'RECEIVE_SESSION',
  RECEIVE_SESSION_FAIL: 'RECEIVE_SESSION_FAIL'
};

export function signin(data) {
  return dispatch => {
    request('/sessions', 'POST', data)
    .then(response => {
      localStorage.setItem('token', response.token);
      dispatch({ type: TYPES.AUTH_USER, user: response.user });
    })
    .catch(response => {
      dispatch({
        type: TYPES.AUTH_ERROR,
        error: response.error
      })
    });
  }
}

export function signout() {
  return dispatch => {
    request('/sessions', 'DELETE')
    .then(() => {
      localStorage.removeItem('token');
      dispatch({ type: TYPES.UNAUTH_USER });
    })
    .catch(response => {
      dispatch({
        type: TYPES.AUTH_ERROR,
        error: response.message
      })
    });
  }
}

export function registerUser(user) {
  return dispatch => {
    request('/users', 'POST', user)
    .then(response =>  {
      localStorage.setItem('token', response.token);
      dispatch({ type: TYPES.AUTH_USER, user: response.user });
    })
    .catch(response => {
      dispatch({
        type: TYPES.AUTH_ERROR,
        error: response.error
      })
    });
  }
}

export function getSession() {
  return dispatch => {
    request('/sessions/current', 'GET')
    .then(response =>  {
      dispatch({ type: TYPES.RECEIVE_SESSION, data: response });
    })
    .catch(response => {
      dispatch({
        type: TYPES.RECEIVE_SESSION_FAIL
      })
    });
  }
}

import { request } from '../utils/api';

export const TYPES: {[key: ActionStrings]: ActionStrings} = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  SET_VISIBILITY_FILTER: 'SET_VISIBILITY_FILTER',
  AUTH_USER: 'AUTH_USER',
  UNAUTH_USER: 'UNAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_DATA: 'FETCH_DATA',
  FETCH_JSON: 'FETCH_JSON',
};

export function signin(data) {
  return dispatch => {
      request('/login', 'POST', data)
      .then(response =>
        {
          localStorage.setItem('token', response.token);
          dispatch({ type: TYPES.AUTH_USER });
        },
        response => {
          dispatch({
            type: TYPES.AUTH_ERROR,
            error: response.message
          })
        }
      );
    }
  }

  export function signout() {
      localStorage.removeItem('token');
      return ({ type: TYPES.UNAUTH_USER });
  }

  //   fetch('/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   }).then(
  //     response => response.json()
  //     .then(json => {
  //       return {
  //         response: json,
  //         status: response.ok
  //       }
  //     }))
  //     .then(({response, status}) => {
  //       if (status) {
  //         localStorage.setItem('token', response.token);
  //         dispatch({ type: TYPES.AUTH_USER });
  //       } else {
  //         dispatch({
  //           type: TYPES.AUTH_ERROR,
  //           error: response.message
  //         })
  //       }
  //     });
  //   }
  // }

  export function signup(user) {
    return dispatch => {
      request('/auth/signup', 'POST', user)
      .then(response =>  {
        localStorage.setItem('token', response.token);
        dispatch({ type: TYPES.AUTH_USER });
      },
      response => {
        dispatch({
          type: TYPES.AUTH_ERROR,
          error: response.message
        })
      }
    )
      }
    }

  // export function signupUser({ email, password }) {
  //     return dispatch => {
  //         axios.post(`${ROOT_URL}/auth/signup`, { email, password })
  //         .then((response) => {
  //             localStorage.setItem('token', response.data.token);
  //             dispatch({ type: TYPES.AUTH_USER });
  //         })
  //         .catch(error => dispatch(authError(error.response.data.error)));
  //     };
  // }
  //
  // export function signoutUser() {
  //     localStorage.removeItem('token');
  //     return ({ type: TYPES.UNAUTH_USER });
  // }
  //
  // export function ifToken() {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //         return (dispatch) => {
  //             dispatch({ type: TYPES.AUTH_USER });
  //         };
  //     }
  // }

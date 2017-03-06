import { TYPES } from '../actions/auth'

const defaultState = {
  user: null,
  authenticated: false,
  error: false
};

export default function auth(state = defaultState, action) {
  switch (action.type) {
    case TYPES.AUTH_USER:

      return Object.assign({}, state, {
        error: '',
        authenticated: true,
        user: action.user
      });

    case TYPES.UNAUTH_USER:
      return { ...state, authenticated: false };

    case TYPES.AUTH_ERROR:
    case TYPES.RECEIVE_SESSION_FAIL:

      return {
        ...state,
        authenticated: false,
        error: action.error,
        user: null
      }

    case TYPES.RECEIVE_SESSION:
      return {
        ...state,
        authenticated: true,
        user: action.data.user
      }

    default:
      return state;
  }
}

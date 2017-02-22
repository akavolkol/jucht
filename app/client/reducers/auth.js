import { TYPES } from '../actions/auth';
const defaultState = {
  user: {},
  authenticated: localStorage.getItem('token') ? true : false,
  error: false
};

export default function auth(state = defaultState, action) {
  switch (action.type) {
    case TYPES.AUTH_USER:
    return Object.assign({}, state, {
      error: '',
      authenticated: true
    });
    case TYPES.UNAUTH_USER:
    return { ...state, authenticated: false };
    case TYPES.AUTH_ERROR:
    return {
      ...state,
      authenticated: false,
      error: action.error
    }
    case TYPES.FETCH_DATA:
    return { ...state, message: action.payload };
    case TYPES.FETCH_JSON:
    return { ...state, user: action.payload };
    default:
    return state;
  }
}

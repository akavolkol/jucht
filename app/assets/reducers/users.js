import { TYPES } from '../actions/users'

const defaultState = {
  users: []
}

export default function users(state = defaultState, action) {
    switch (action.type) {
        case TYPES.USERS_RECEIVED:
          return {
            ...state,
            users: action.data
          }

        case TYPES.USERS_NOT_RECIVED:
          return state;


        default:
            return state;
    }
}

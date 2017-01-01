import { combineReducers } from 'redux'
import messages from './messages'
import auth from './auth'
import flashMessages from './flashMessages'
import users from './users'

const rootReducer = combineReducers({
   messages,
   auth,
   flashMessages,
   users
});

export default rootReducer;

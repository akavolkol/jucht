import { combineReducers } from 'redux'
import messages from './messages'
import auth from './auth'
import flashMessages from './flashMessages'
import users from './users'
import conversations from './conversations'

const rootReducer = combineReducers({
   messages,
   auth,
   flashMessages,
   users,
   conversations
});

export default rootReducer;

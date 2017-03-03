import { combineReducers } from 'redux'
import messages from './messages'
import auth from './auth'
import flashMessages from './flashMessages'
import users from './users'
import conversations from './conversations'
import media from './media'

const rootReducer = combineReducers({
   messages,
   auth,
   flashMessages,
   users,
   conversations,
   media
});

export default rootReducer;

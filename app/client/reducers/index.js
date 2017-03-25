import { combineReducers } from 'redux'
import auth from './auth'
import flashMessages from './flashMessages'
import users from './users'
import conversations from './conversations'
import media from './media'

const rootReducer = combineReducers({
   auth,
   flashMessages,
   users,
   conversations,
   media
});

export default rootReducer;

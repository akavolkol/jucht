import React from 'react';
import {render} from 'react-dom';
import { Router, browserHistory, hashHistory } from 'react-router';
import routes from './routes';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import config from './config/app'
import {createStore, applyMiddleware } from 'redux'

let preloadedState = {auth: {user: null, authenticated: localStorage.getItem('token') ? true : false} };

if (typeof initialAppData !== 'undefined') {
  preloadedState = {
    auth: initialAppData.auth,
    users: initialAppData.users,
    conversations: initialAppData.conversations
  };
}

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunkMiddleware)
);

const historyType = config.clientType == 'web' ? browserHistory : hashHistory;

render(
  <Provider store={store}>
    <Router history={historyType} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

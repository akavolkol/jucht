import React from 'react';
import {render} from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers';
import {createStore, applyMiddleware } from 'redux';

let preloadedState = window.initialAppData;
const store = createStore(
  rootReducer,
  {
     auth: preloadedState.auth,
     users: preloadedState.users,
     conversations: preloadedState.conversations
  },
  applyMiddleware(thunkMiddleware)
);
store.subscribe(() => {
    store.getState();
});

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

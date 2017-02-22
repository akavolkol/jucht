import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Index from '../containers/Index.js';
import Login from '../containers/login';
import Home from '../containers/Home';
import Signup from '../containers/signup';
import Settings from '../containers/settings'

const routes = (
	<Route path='/' component={Index}>
		<IndexRoute component={Home} />
    <Route path='settings/profile' component={Settings} />
		<Route path='login' component={Login} />
		<Route path='signup' component={Signup} />
	</Route>

);

export default routes;

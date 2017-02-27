import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Index from '../containers/index.js'
import Login from '../containers/login'
import Home from '../containers/home'
import Signup from '../containers/signup'
import Settings from '../containers/settings'

const routes = (
	<Route path='/' component={Index}>
		<IndexRoute component={Home} />
    <Route path='settings' component={Settings} />
		<Route path='login' component={Login} />
		<Route path='signup' component={Signup} />
    <Route path='conversations/:username' component={Home} />
	</Route>

);

export default routes;

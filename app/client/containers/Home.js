import React, { Component, PropTypes } from 'react'
import AsideMenu from '../components/asideMenu'
import Content from '../components/content'
import { connect } from 'react-redux'

class Home extends Component {

  componentWillReceiveProps(newProps) {
    if (!newProps.auth.authenticated) {
      if (!this.props.auth.authenticated) {
        this.props.router.push({pathname: '/login'});
      }
    }
  }

	render() {
		return (
			<div className="app">
        <AsideMenu/>
				<Content/>
			</div>
		)
	}
}

export default connect(
  state => {
    const { auth } = state;
    return {
      auth
    }
  }
)(Home)

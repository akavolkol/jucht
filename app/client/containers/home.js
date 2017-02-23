import React, { Component, PropTypes } from 'react'
import AsideMenu from '../components/asideMenu'
import Content from '../components/content'
import { connect } from 'react-redux'
import { join as joinConveration } from '../actions/conversations'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.auth.authenticated) {
      return this.props.router.push({pathname: '/login'});
    }

    this.props.joinConveration({
      username: this.props.params.username
    });
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.auth.authenticated) {
        this.props.router.push({pathname: '/login'});
    }

    if (this.props.params.username) {
      console.log(this.props.params.username);
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
      auth,

    }
  },
  { joinConveration }
)(Home)

import React, { Component, PropTypes } from 'react'
import AsideMenu from '../components/asideMenu'
import Content from '../components/content'
import { connect } from 'react-redux'
import { openConversation, list as selectConversations } from '../actions/conversations'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props.auth.user.username);
    if (!this.props.auth.authenticated) {
      return this.props.router.push({pathname: '/login'});
    }

    this.props.selectConversations();
    this.props.params.username && this.props.openConversation(this.props.params.username);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.auth.authenticated) {
        this.props.router.push({pathname: '/login'});
    }

    this.props.selectConversations();
    this.props.params.username && this.props.openConversation(this.props.params.username);
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
  },
  { openConversation, selectConversations }
)(Home)

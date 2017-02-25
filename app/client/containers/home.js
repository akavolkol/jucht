import React, { Component, PropTypes } from 'react'
import AsideMenu from '../components/asideMenu'
import Content from '../components/content'
import { connect } from 'react-redux'
import { openConversation, list as selectConversations } from '../actions/conversations'
import socket from 'socket.io-client'

class Home extends Component {
  constructor(props) {
    super(props);
    this.socket = socket();
  }

  componentWillMount() {
    if (!this.props.auth.authenticated) {
      return this.props.router.push({pathname: '/login'});
    }

    this.props.selectConversations();
    this.props.params.username && this.props.openConversation(this.props.params.username);
  }

  componentDidMount() {
    this.socket.emit('join', this.props.auth.user.username);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.auth.authenticated) {
        this.props.router.push({pathname: '/login'});
    }
    //newProps.selectConversations();
    newProps.params.username && newProps.openConversation(newProps.params.username);
  }

	render() {
		return (
			<div className="app">
        <AsideMenu/>
				<Content socket={this.socket}/>
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

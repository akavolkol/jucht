import React, { Component, PropTypes } from 'react'
import AsideMenu from '../components/asideMenu'
import Content from '../components/content'
import { connect } from 'react-redux'
import { openConversation, list as selectConversations, unsetActiveConversation } from '../actions/conversations'
import socket from 'socket.io-client'
import config from '../config/app'

class Home extends Component {
  constructor(props) {
    super(props);
    this.socket = socket(config.host);
    if (!this.props.auth.authenticated) {
      return this.props.router.push({pathname: '/login'});
    }
  }

  componentWillMount() {
    this.props.selectConversations();
    this.props.params.conversationId && this.props.openConversation(this.props.params.conversationId);
  }

  componentDidMount() {
    this.socket.emit('join', this.props.auth.user);
    this.socket.on('conversationsUpdated', () => {
      this.props.selectConversations();
    })
  }

  componentWillReceiveProps(newProps) {
    const { conversation } = newProps.conversations;
    const oldConversation = this.props.conversations.conversation;
    if (!newProps.auth.authenticated) {
        this.props.router.push({pathname: '/login'});
    }

    if (conversation) {
      if (oldConversation && oldConversation._id != conversation._id) {
        this.socket.emit('leaveConversation', conversation._id);
        this.socket.emit('conversation', { conversation: conversation });
      } else if (!oldConversation) {
        this.socket.emit('conversation', { conversation: conversation });
      }
    }
    /**
     * switch beetwen chats - rid changes + need load
     * open chat from empty - rid changes + need load, cid may null
     * close chat - cid changes + need route update, rid may null
     * open from search - cid changes + need route update, rid may null
     */
     if (newProps.params.conversationId && this.props.params.conversationId != newProps.params.conversationId) {
       this.props.openConversation(newProps.params.conversationId);
       if (conversation && newProps.params.conversationId != conversation._id
       && conversation._id != oldConversation._id) {
         this.props.router.push({pathname: '/conversations/' + conversation._id});
       }
     }

    if ((!oldConversation && !this.props.params.conversationId && conversation)
      || oldConversation && conversation && conversation._id != oldConversation._id
    ) {
       this.props.router.push({pathname: '/conversations/' + conversation._id});
     }

     if (oldConversation && !conversation && newProps.params.conversationId) {
       this.props.router.push({pathname: ''});
     }

     if (oldConversation && conversation && !newProps.params.conversationId) {
       this.props.unsetActiveConversation();
     }
  }

	render() {
    if (this.props.auth.user && this.props.auth.authenticated) {


		return (
			<div className="app">
        <AsideMenu socket={this.socket}/>
				<Content socket={this.socket}/>
			</div>
		)
  } else {
    return null;
  }
	}
}

export default connect(
  state => {
    const { auth, conversations } = state;
    return {
      auth, conversations
    }
  },
  { openConversation, selectConversations, unsetActiveConversation }
)(Home)

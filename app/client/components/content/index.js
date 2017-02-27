import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from './header'
import './content.scss';
import Chat from '../chat/'

class Content extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { conversation } = this.props.conversations;

    if (conversation) {
      const title = conversation.participants.length > 2
        ? 'Group conversation'
        : `Conversation`;

      return(
        <div className="content">
          <Header title={title} conversation={conversation}/>
          <Chat socket={this.props.socket} conversation={conversation}/>
        </div>
      )
    } else {
      return null
    }

  }
}

export default connect(
  state => {
    const { conversations } = state
    return { conversations }
  }
)(Content)

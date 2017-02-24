import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from './header'
import './content.scss';
import Chat from '../chat/'
import Option from './option'

class Content extends Component {

  constructor(props) {
    super(props);
  }

  renderOption() {
    return(
      <Option/>
    )
  }

  render() {
    const { conversation } = this.props.conversations;

    if (conversation) {
      return(
        <div className="content">
          <Header title={'Conversation from ' + conversation.createdAt} children={this.renderOption()}/>
          <Chat conversation={conversation}/>
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

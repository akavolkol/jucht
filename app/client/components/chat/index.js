import React, { Component } from 'react'
import { connect } from 'react-redux'
import './chat.scss'
import InputSection from './inputSection'
import Message from './message'
import { getConversation } from '../../actions/conversations'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket;
  }

  componentDidMount() {
    this.socket.on('conversationUpdated', () => {
      this.props.getConversation(this.props.conversations.conversation._id);
    });
  }

  componentDidUpdate() {
    this.refs.scroll.scrollTop = this.refs.scroll.scrollHeight;
  }

  render() {
    const { conversation } = this.props.conversations;

    return(
      <main className="chat">
        <section ref="scroll" className="chat__items">
          <div className="scroller js-scroller custom-scrollbar__recipient hidden" id="qQJdFtsDeKGhan5wY">
            <div className="chat-message-area">
                <div className="chat-message-loader">
                  And more...
                </div>
                { (!!conversation.messages.length)
                  && conversation.messages.map((message, key) => {
                    return <Message conversation={conversation} message={message} key={key}/>
                  })
                }
            </div>
          </div>
        </section>
        <InputSection socket={this.socket}/>
      </main>
    )
  }
}

export default connect(
  state => {
    const { conversations } = state
    return { conversations }
  },
  { getConversation }
)(Chat)

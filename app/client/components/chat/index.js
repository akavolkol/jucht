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

    this.refs.scroll.scrollTop = this.refs.scroll.scrollHeight;
  }

  componentDidUpdate() {
    this.refs.scroll.scrollTop = this.refs.scroll.scrollHeight;
  }

  render() {
    const { conversation } = this.props.conversations;

    return(
      <main className="chat">
        <section className="chat__items">
          <div ref="scroll" className="scroller js-scroller custom-scrollbar__recipient hidden" id="qQJdFtsDeKGhan5wY">
            <div className="chat-message-area">
                {/* <div className="chat-message-loader">
                  And more...
                </div> */}
                { (!!conversation.messages.length)
                  && conversation.messages.map((message) => {
                    if (message) return <Message conversation={conversation} socket={this.props.socket} message={message} key={message._id}/>
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

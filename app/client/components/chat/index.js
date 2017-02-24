import React, { Component } from 'react';
import './chat.scss'
import InputSection from './inputSection'
import Messages from './messages'

export default class Chat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const conversation = this.props.conversation;

    return(
      <main className="chat">
        <section className="chat__items">
          <div className="scroller js-scroller custom-scrollbar__recipient hidden" id="qQJdFtsDeKGhan5wY">
            <div className="chat-message-area">
                <div className="chat-message-loader">
                  And more...
                </div>
                { (!!conversation.messages.length) && <Messages messages={conversation.messages}/> }
            </div>
          </div>
        </section>
        <InputSection/>
      </main>
    )
  }
}

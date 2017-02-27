import React, { Component } from 'react';
import './chat.scss'
import InputSection from './inputSection'
import Message from './message'

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typing: {}
    };
    this.socket = this.props.socket;

  }

  componentDidMount() {
    this.socket.on('typing', (data) => {
      this.setState({ typing: data });
      setTimeout(() => {
        this.setState({ typing: {} });
      }, 5000);
    });
  }

  componentDidUpdate() {
    this.refs.scroll.scrollTop = this.refs.scroll.scrollHeight;
  }

  render() {
    const conversation = this.props.conversation;

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
        { !!Object.keys(this.state.typing).length && <p>{ this.state.typing.username + ' is typing...'}</p>}
        <InputSection socket={this.socket}/>
      </main>
    )
  }
}

import React, { Component } from 'react';
import './chat.scss'
import InputSection from './inputSection'
import Message from './message'

export default class Chat extends Component {
  render() {
    return(
      <main className="chat">
        <section className="chat__items">
          <div className="scroller js-scroller custom-scrollbar__recipient hidden" id="qQJdFtsDeKGhan5wY">
            <div className="chat-message-area">
                <div className="chat-message-loader">
                  And more...
                </div>

                <Message/>
                <Message/>
            </div>
          </div>
        </section>
        <InputSection/>
      </main>
    )
  }
}

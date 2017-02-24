import React, { Component } from 'react'
import './message.scss'

export default class Message extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const messages = this.props.messages;

    return (
      <div id="" className="message">
        <div className="message__avatar">
          <img src="/images/logo.png"/>
        </div>

        <div className="message__content">
          <div className="message__meta">
            <span className="message__username">Missed Bot</span>
            <time className="message__time">4:34</time>
          </div>
          <div className="message__text">
            <div className="chat-bubble__message">
              This chat was sent long time ago in a galaxy far, far away.
              It was missed, and that’s where your missed chats will be.
              Hopefully there won’t be many of them. All the best!
            </div>
          </div>
        </div>

      </div>
    )
  }
}

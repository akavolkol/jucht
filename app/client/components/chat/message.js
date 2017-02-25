import React, { Component } from 'react'
import './message.scss'
import moment from 'moment'

export default class Message extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const message = this.props.message;

    return (
      <div id="" className="message">
        <div className="message__avatar">
          <img src="/images/logo.png"/>
        </div>

        <div className="message__content">
          <div className="message__meta">
            <span className="message__username">{message.author.username}</span>
            <time className="message__time"> {moment(message.createdAt).fromNow()}</time>
          </div>
          <div className="message__text">
            <div className="chat-bubble__message">
              {message.text}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

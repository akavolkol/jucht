import React, { Component } from 'react';
import './chat-input.scss'

export default class InputSection extends Component {
  render() {
    return(
      <section className="chat-input">
        <textarea placeholder="Type a message"></textarea>
      </section>
    )
  }
}

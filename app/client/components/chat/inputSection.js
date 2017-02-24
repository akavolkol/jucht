import React, { Component } from 'react';
import './chat-input.scss'

export default class InputSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  onSumbit = (event) => {
    event.preventDefault();
    if (event.keyCode == 13 || event.keyCode == 10) {
      console.log(this.refs.message.value);
    }

    //this.setState({ message: this.refs.message });
  }

  render() {
    return(
      <form onSubmit={this.onSumbit}>
      <section className="chat-input">
        <textarea ref="message" onKeyUp={this.onSumbit} placeholder="Type a message"></textarea>
      </section>
      </form>

    )
  }
}

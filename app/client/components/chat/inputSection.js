import React, { Component } from 'react'
import { connect } from 'react-redux'
import './chat-input.scss'
import { sendMessage } from '../../actions/conversations'

class InputSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      typing: {}
    }
    this.socket = this.props.socket;
  }

  componentDidMount() {
    this.socket.on('typing', (data) => {
      console.log(data);
      this.setState({ typing: data });
      setTimeout(() => {
        this.setState({ typing: {} });
      }, 5000);
    });
  }

  onSumbit = (event) => {
    event.preventDefault();
    const conversation = this.props.conversations.conversation;
    const inputValue = this.refs.message.value;

    this.socket.emit('typing', conversation._id);
    if ((event.keyCode == 13 || event.keyCode == 10)
      && inputValue !== ''
    ) {
      let message = {
        text: inputValue.replace(/s{,2}|\n/, ''),
        author: this.props.auth.user
      };

      this.props.sendMessage(conversation._id, message);
      this.socket.emit('updatingConversation', conversation._id);
      this.setState({ message: '' });
    }
  }

  onChange = (event) => {
    this.setState({ message: event.target.value });
  }

  render() {
    return(
      <form className="chat-input" onSubmit={this.onSumbit}>
        { !!Object.keys(this.state.typing).length && <p className="chat-input__typing">{ this.state.typing.username + ' is typing...'}</p> }

        <textarea ref="message" onChange={this.onChange} onKeyUp={this.onSumbit} value={this.state.message} placeholder="Type a message"></textarea>
      </form>

    )
  }
}

export default connect(
  state => {
    const { conversations, auth } = state;
    return { conversations, auth }
  },
  { sendMessage }
)(InputSection)

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './message.scss'
import moment from 'moment'
import { connect } from 'react-redux'
import { removeMessage, editMessage } from '../../actions/conversations'

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldAppearMessageOptions: false,
      editing: false,
      text: this.props.message.text
    };
  }

  targetIsDescendant(event, parent) {
    let node = event.target;
    while (node !== null) {
      if (node === parent) return true;
      node = node.parentNode;
    }
    return false;
  }


  handleDocumentClick = (event) => {
    if (this.state.shouldAppearMessageOptions && !this.targetIsDescendant(event, ReactDOM.findDOMNode(this))) {
      this.toogleOptionsVisible();
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  onClickEdit = () => {
    this.setState({
      editing: !this.state.editing
    });
  }

  onClickRemove = () => {
    this.props.removeMessage(this.props.conversation._id, this.props.message._id);
    this.setState({
      shouldAppearMessageOptions: !this.state.shouldAppearMessageOptions
    })
  }

  onChange = (event) => {
    event.preventDefault();
    this.setState({
      text: event.target.value
    });
  }

  onSumbit = (event) => {
    event.preventDefault();
    const conversation = this.props.conversation;
    if ((event.keyCode == 13 || event.keyCode == 10)
      && this.state.text !== ''
    ) {
      let message = {
        text: this.state.text.replace(/s{,2}|\n/, ''),
      };

      this.props.editMessage(conversation._id, this.props.message._id, message);
      this.setState({ editing: false, shouldAppearMessageOptions: false });
    }
  }

  toogleOptionsVisible = () => {
    this.setState({
      shouldAppearMessageOptions: !this.state.shouldAppearMessageOptions
    })
  }

  renderMessageOptions() {
    return(
      <div>
      <button onClick={this.toogleOptionsVisible}>
          <i className="icon option__icon">
            <svg><use xlinkHref="/images/bytesize-inline.svg#i-settings"/></svg>
          </i>
      </button>
      { this.state.shouldAppearMessageOptions
        && <ul className="account-options">
          <li className="item">
          <a onClick={this.onClickEdit}>
            <div className="account-options__icon">
              <i className="icon option__icon">
                <svg><use xlinkHref="/images/bytesize-inline.svg#i-lock"/></svg>
              </i>
            </div>
            <div className="account-options__label">Edit</div>
          </a>
        </li>
          <li className="item item--attention">
            <a onClick={this.onClickRemove}>
              <div className="account-options__icon">
                <i className="icon option__icon">
                  <svg><use xlinkHref="/images/bytesize-inline.svg#i-ban"/></svg>
                </i>
              </div>
              <div className="account-options__label">Remove</div>
            </a>
          </li>
        </ul>
      }
    </div>
    )
  }

  render() {
    const message = this.props.message;

    return (
      <div id="" className={"message " + (this.state.editing ? 'message--editing' : null)}>
        <div className="message__avatar">
          <img src="/images/logo.png"/>
        </div>

        <div className="message__content">
          <div className="message__meta">
            <span className="message__username">{message.author.username}</span>
            <time className="message__time"> {moment(message.createdAt).fromNow()} </time>
            { message.updatedAt && <span>(Updated)</span>}
          </div>
          <div className="message__text">
            <div className="message__text-content">
              {this.state.text}
            </div>
            {this.renderMessageOptions()}
          </div>
          <div className="message__edit">
          <input onChange={this.onChange} value={this.state.text} onKeyUp={this.onSumbit}/>
        </div>
        </div>

      </div>
    )
  }
}

export default connect(
  state => {
    const { auth } = state
    return { auth }
  },
  { removeMessage, editMessage }
)(Message)

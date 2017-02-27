import React, { Component } from 'react'
import './message.scss'
import moment from 'moment'
import { connect } from 'react-redux'
import { removeMessage } from '../../actions/conversations'

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldAppearMessageOptions: false
    };
  }

  onClickEdit = () => {

  }

  onClickRemove = () => {
    this.props.removeMessage(this.props.conversation._id, this.props.message._id)
  }

  toogleOptionsVisible = () => {
    this.setState({
      shouldAppearMessageOptions: !this.state.shouldAppearMessageOptions
    })
  }

  renderMessageOptions() {
    return(
      <div>
      <button onClick={this.toogleOptionsVisible} class="chat-bubble__settings icon-button js-message-dropdown-toggle">
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
            <div className="message__text-content">
              {message.text}
            </div>
            {this.renderMessageOptions()}
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
  { removeMessage }
)(Message)

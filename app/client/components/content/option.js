import React, { Component } from 'react'
import './option.scss'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { leave } from '../../actions/conversations'

class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldAppearOptions: false
    };
  }

  onClickOption = () => {
    this.setState({
      shouldAppearOptions: !this.state.shouldAppearOptions
    });
  }

  onClickLeave = (event) => {
    event.preventDefault();
    this.props.leave(this.props.conversations.conversation._id);
  }

  renderOptions() {
    const conversation = this.props.conversations.conversation;
    const user = this.props.auth.user;

    return(
      <ul className="account-options">
        <li>
          <a onClick={this.onClickLeave}>
            <div className="account-options__icon">
              <i className="icon option__icon">
                <svg><use xlinkHref="/images/bytesize-inline.svg#i-ban"/></svg>
              </i>
            </div>
            <div className="account-options__label">Leave</div>
          </a>
        </li>
        { (conversation.ownerId == user._id) ? (
        <li>
        <a >
          <div className="account-options__icon">
            <i className="icon option__icon">
              <svg><use xlinkHref="/images/bytesize-inline.svg#i-lock"/></svg>
            </i>
          </div>
          <div className="account-options__label">Delete</div>
        </a>
      </li>) : null
        }
      </ul>
    )
  }

  render() {
    return(
      <div className="option">
        <a onClick={this.onClickOption}>
          <i className="icon option__icon">
            <svg><use xlinkHref="/images/bytesize-inline.svg#i-ellipsis-vertical"/></svg>
          </i>
        </a>
        { this.state.shouldAppearOptions && this.renderOptions() }
      </div>
    )
  }
}

export default connect(
  state => {
    const { conversations, auth } = state
    return { conversations, auth }
  },
  { leave }
)(Option)

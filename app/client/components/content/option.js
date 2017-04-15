import React, { Component } from 'react'
import './option.scss'
import { connect } from 'react-redux'
import { leave, remove } from '../../actions/conversations'
import { assets } from '../../utils/crossResources'

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

  onClickRemove = (event) => {
    event.preventDefault();
    this.props.remove(this.props.conversations.conversation._id);
  }

  renderOptions() {
    const conversation = this.props.conversations.conversation;
    const user = this.props.auth.user;

    return(
      <ul className="account-options">
        { (conversation.ownerId == user._id) ? (
        <li className="item">
        <a onClick={this.onClickRemove}>
          <div className="account-options__icon">
            <i className="icon option__icon">
              <svg><use xlinkHref={assets("images/bytesize-inline.svg#i-lock")}/></svg>
            </i>
          </div>
          <div className="account-options__label">Delete</div>
        </a>
      </li>) : (
        <li className="item item--attention">
          <a onClick={this.onClickLeave}>
            <div className="account-options__icon">
              <i className="icon option__icon">
                <svg><use xlinkHref={assets("images/bytesize-inline.svg#i-ban")}/></svg>
              </i>
            </div>
            <div className="account-options__label">Leave</div>
          </a>
        </li>
      )
        }
      </ul>
    )
  }

  render() {
    return(
      <div className="option">
        <a onClick={this.onClickOption}>
          <i className="icon option__icon">
            <svg><use xlinkHref={assets("images/bytesize-inline.svg#i-ellipsis-vertical")}/></svg>
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
  { leave, remove }
)(Option)

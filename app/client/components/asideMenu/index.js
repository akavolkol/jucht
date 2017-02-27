import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import './asideMenu.scss'
import './accountOptions.scss'
import InterlocutorSearcher from '../interlocutorSearcher'
import { signout } from '../../actions/auth'
import { connect } from 'react-redux'

class AsideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldAppearAccountOptions: false
    }
  }

  onClickSignout = (event) => {
    event.preventDefault();
    this.props.signout();
  }

  onClickAccountOptions = (event) => {
    event.preventDefault();
    this.setState({ shouldAppearAccountOptions: !this.state.shouldAppearAccountOptions });
  }

  renderAccountOptions() {
    return(
      <ul className="account-options">
        <li className="item">
          <Link to="/settings">
            <div className="account-options__icon">
              <i className="icon option__icon">
                <svg><use xlinkHref="/images/bytesize-inline.svg#i-ban"/></svg>
              </i>
            </div>
            <div className="account-options__label">Notification Settings</div>
          </Link>
        </li>
        <li className="item">
        <a onClick={this.onClickSignout}>
          <div className="account-options__icon">
            <i className="icon option__icon">
              <svg><use xlinkHref="/images/bytesize-inline.svg#i-lock"/></svg>
            </i>
          </div>
          <div className="account-options__label">Logout</div>
        </a>
        </li>
      </ul>
    )
  }

  renderConversations() {
    const { conversations } = this.props.conversations;
    let preparedConversations = [];
    conversations.map(converstaion => {
      converstaion.participants.map(participant => {
        if (!converstaion.label && participant._id != this.props.auth.user._id) {
          converstaion.label = participant.username;
        }
      });

      preparedConversations.push(converstaion);
    });

    return(
       <ul className="aside__menu">
          { preparedConversations.map((converstaion, key) => {
              return <li key={key} className="aside__menu-item">
                  <Link
                    to={'/conversations/' + converstaion._id}
                    className="aside__menu-item-inner"
                    activeClassName="aside__menu-item-inner--active"
                  >
                    <div className="aside__menu-avatar">
                      <img src="/images/logo.png"/>
                    </div>
                    <div className="aside__menu-content">{converstaion.label}</div>
                    { !!converstaion.messages.length
                      && <span className="indicator">{ converstaion.messages.length }</span>
                    }
                  </Link>
                </li>
            })
          }
          </ul>
    )
  }

	render() {
    const user = this.props.auth.user;

		return (
      <aside className="aside">
        <div className="aside__header">
          <Link className="aside__logo" to="/" >
            <img src="/images/logo.png"/>
          </Link>
          <span className="aside__title">{user.username}</span>
          <a onClick={this.onClickAccountOptions}>
            <i className="icon option__icon">
              <svg><use xlinkHref="/images/bytesize-inline.svg#i-ellipsis-vertical"/></svg>
            </i>
          </a>
          { this.state.shouldAppearAccountOptions && this.renderAccountOptions() }
        </div>

        <InterlocutorSearcher/>

        <div className="aside__navigation">
          { !!this.props.conversations && this.renderConversations() }
        </div>

        <div className="aside__actions">
          <button className="action-button">+</button>
        </div>
      </aside>
		)
	}
}

export default connect(
  state => {
    const { conversations, auth } = state
    return { conversations, auth }
  },
  { signout }
)(AsideMenu)

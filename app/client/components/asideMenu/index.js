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
        <li>
          <Link to="/settings">
            <div className="account-options__icon">
              <i className="icon option__icon">
                <svg><use xlinkHref="/images/bytesize-inline.svg#i-ban"/></svg>
              </i>
            </div>
            <div className="account-options__label">Notification Settings</div>
          </Link>
        </li>
        <li>
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

	render() {
		return (
      <aside className="aside">
        <div className="aside__header">
          <div className="aside__logo">
            <img src="/images/logo.png"/>
          </div>
          <span className="aside__title">Компанія Volkol</span>
          <a href="/api/logout" onClick={this.onClickAccountOptions}>
            <i className="icon option__icon">
              <svg><use xlinkHref="/images/bytesize-inline.svg#i-ellipsis-vertical"/></svg>
            </i>
          </a>
          { this.state.shouldAppearAccountOptions && this.renderAccountOptions() }
        </div>

        <InterlocutorSearcher/>

        <div className="aside__navigation">
          <ul className="aside__menu">

            <li className="aside__menu-item">
              <a href="" className="aside__menu-item-inner">
                <div className="aside__menu-avatar">
                  <img src="/images/logo.png"/>
                </div>
                <div className="aside__menu-content">Nick V.</div>
                <span className="indicator">233</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="aside__actions">
          <button className="action-button">+</button>
        </div>
      </aside>
		)
	}
}

export default connect(
  null,
  { signout }
)(AsideMenu)

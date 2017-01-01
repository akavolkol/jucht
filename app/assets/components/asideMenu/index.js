import React, { Component, PropTypes } from 'react'
import './asideMenu.scss'
import InterlocutorSearcher from '../interlocutorSearcher'
import { signout } from '../../actions/auth'
import { connect } from 'react-redux'

class AsideMenu extends Component {

  onClickSignout = (event) => {
    event.preventDefault();
    this.props.signout();
  }

	render() {
		return (
      <aside className="aside">
        <div className="aside__header">
          <div className="aside__logo">
            <img src="/images/logo.png"/>
          </div>
          <span className="aside__title">Компанія Volkol</span>
          <a href="/api/logout" onClick={this.onClickSignout}>Вийти</a>
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

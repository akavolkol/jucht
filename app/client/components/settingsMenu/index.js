import React, { Component } from 'react'
import { Link } from 'react-router'
import './settingsMenu.scss'

export default class SettingsMenu extends Component {
  render() {
    return(
      <div className="SettingsNav">
        <Link to="/" className="btn btn--medium return-button">Go back</Link>
        {/* <ul>
          <li className="NavItem">
            <a className="Link NavItem-link NavItem-link--active" href="/settings/profile">Profile</a>
          </li>
        </ul> */}
      </div>
    )
  }
}

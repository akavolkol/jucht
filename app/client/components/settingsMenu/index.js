import React, { Component } from 'react'
import './settingsMenu.scss'

export default class SettingsMenu extends Component {
  render() {
    return(
      <div className="SettingsNav">
        <ul>
          <li className="NavItem">
            <a className="Link  NavItem-link NavItem-link--active" href="/settings/profile">Profile</a>
          </li>
          <li className="NavItem"><a className="Link  NavItem-link" href="/settings/account">Account</a></li>
          <li className="NavItem"><a className="Link  NavItem-link" href="/settings/notifications">Notifications</a></li>
        </ul>
      </div>
    )
  }
}

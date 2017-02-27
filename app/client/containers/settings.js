import React, { Component, PropTypes } from 'react'
import { createFlashMessage } from '../actions/flashMessages'
import SettingsMenu from '../components/settingsMenu'
import SettingsForm from '../components/settings'

export default class Settings extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="app">
        <aside>
          <SettingsMenu/>
        </aside>
        <SettingsForm/>
      </div>
    )
  }
}

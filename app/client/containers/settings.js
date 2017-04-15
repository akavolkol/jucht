import React, { Component } from 'react'
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

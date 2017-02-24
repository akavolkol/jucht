import React, { Component, PropTypes } from 'react'
import { createFlashMessage } from '../actions/flashMessages'
import SettingsMenu from '../components/settingsMenu'

export default class Settings extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <aside>
          <SettingsMenu/>
        </aside>
        <div>sdfs</div>
      </div>
    )
  }
}

import React, { Component } from 'react';
import Header from './header'
import './content.scss';
import Chat from '../chat/'
import Option from './option'

export default class Content extends Component {

  renderOption() {
    return(
      <Option/>
    )
  }
  render() {
    return(
      <div className="content">
        <Header title="Діалог" children={this.renderOption()}/>
        <Chat/>
      </div>
    )
  }
}

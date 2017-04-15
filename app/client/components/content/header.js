import React, { Component } from 'react'
import './header.scss'
import Option from './option'

export default class Header extends Component {

  renderOption() {
    return(
      <Option/>
    )
  }

  render() {
    const {title} = this.props

    return (
      <section className="header">
        <div className="header__title">{title}</div>
        <div>
          {this.renderOption()}
        </div>
      </section>
      )
  }
}

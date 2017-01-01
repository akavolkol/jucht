import React, { Component } from 'react'
import './header.scss'

export default class Header extends Component {
  render() {
    const {title, children} = this.props

    return (
      <section className="header">
        <div className="header__title">{title}</div>
        <div >
          {children}
        </div>
      </section>
      )
  }
}

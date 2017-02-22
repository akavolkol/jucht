import React, { Component } from 'react'
import './option.scss'

export default class Option extends Component {
  render() {
    return(
      <div className="option">
        <i className="icon option__icon"><svg><use xlinkHref="/images/bytesize-inline.svg#i-ellipsis-vertical"/></svg></i>
      </div>
    )
  }
}

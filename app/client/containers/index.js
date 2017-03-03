import React, { Component, PropTypes } from 'react'
import FlashMessages from '../components/flashMessages'
import { connect } from 'react-redux'
import '../styles/style.scss'

export class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children} = this.props;

    return (
      <div className="app">
        <FlashMessages/>
          {children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  return {auth};
}

export default connect(mapStateToProps)(Index)

import React, { Component, PropTypes } from 'react'
import FlashMessages from '../components/flashMessages'
import { connect } from 'react-redux'
import '../styles/style.scss'
import { getSession } from '../actions/auth'

export class Index extends Component {
  constructor(props) {
    super(props);
    if (!this.props.auth.user || !this.props.auth.authenticated) {
      this.props.getSession();
    }
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

export default connect(mapStateToProps, { getSession })(Index)

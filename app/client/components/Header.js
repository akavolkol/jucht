import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import '../styles/header/header.scss';
import { signoutUser } from '../actions/auth';

class Header extends Component {

  renderAuthorized() {
    if (this.props.auth.authenticated) {
      return (
        <a href="/" onClick={(e) => this.props.signoutUser()}>Logout</a>
      );
    } else {
      return (
        <Link className="navigation__sub-item-link" href="/login"
               activeClassName="navigation__sub-item-link--active"
               to="/login"
        >
        Login
        </Link>
      );
    }
  }

  render() {
    return (
      <header className="header">
      <div className="container">
      Hello
      <Link className="navigation__sub-item-link" href="/"
             activeClassName="navigation__sub-item-link--active"
             to="/">
             Home
             </Link>
            { this.renderAuthorized() }
      </div>

      </header>
      )
  }

}

function mapStateToProps(state) {
    const { auth } = state;
    return { auth };
}

export default connect(mapStateToProps, {signoutUser})(Header)

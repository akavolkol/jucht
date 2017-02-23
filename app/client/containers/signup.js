import React, { Component, PropTypes } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { createFlashMessage } from '../actions/flashMessages'
import { signup } from '../actions/auth'

class Signup extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const {auth} = this.props;
    if (auth.authenticated) {
    } else if (nextProps.auth.error) {
      console.log(nextProps.auth.error);
      this.props.createFlashMessage({
        title: 'Error',
        body: nextProps.auth.error,
        type: 'danger'
      });
    }

  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.signup({
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    });
  }

  shouldComponentUpdate() {
    if (this.props.auth.authenticated) {
      this.props.router.push({pathname: '/'});
      return false;
    }
    return true;

  }

  render() {
    return (
      <div>
        <div className="login-bg"></div>
        <h1 className="form-header">Login</h1>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="login-username">Username:</label>
            <input ref="username" type="text" className="form-control" id="loginUsername" required />
          </div>
          <div className="form-group">
            <label htmlFor="login-username">Email:</label>
            <input ref="email" type="email" className="form-control" id="loginUsername" required />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password:</label>
            <input ref="password" type="password" className="form-control" id="loginPassword"  required />
          </div>

          <button type="submit" className="btn btn-default form-submit">Submit</button>
        </form>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  return {auth};
}

export default connect(mapStateToProps, {signup, createFlashMessage})(Signup)

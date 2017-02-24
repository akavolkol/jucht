import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { createFlashMessage } from '../actions/flashMessages'
import { signin } from '../actions/auth'

class Login extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.auth.authenticated) {
      this.props.router.push({pathname: '/'});
    }
  }

  componentWillReceiveProps(nextProps) {
    const {auth} = this.props;
    if (this.props.auth.authenticated || nextProps.auth.authenticated) {
      this.props.router.push({pathname: '/'});
    } else if (nextProps.auth.error) {
      this.props.createFlashMessage({
        title: 'Error',
        body: nextProps.auth.error,
        type: 'danger'
      });
    }

  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.signin({
      username: this.refs.username.value,
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
      <main className="main">
        <div className="section">
        <h1 className="form-header">Login</h1>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="login-username">Username:</label>
            <input ref="username" type="text" className="form-control" id="loginUsername" required />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password:</label>
            <input ref="password" type="password" className="form-control" id="loginPassword"  required />
          </div>

          <button type="submit" className="btn btn-default form-submit">Submit</button>
        </form>
        <Link to="/signup">Sign up</Link>
      </div>
    </main>
    );
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  return {auth};
}

export default connect(mapStateToProps, {signin, createFlashMessage})(Login)

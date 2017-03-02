import React, { Component } from 'react'
import { connect } from 'react-redux'

class SettingsForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props.auth;

    return(
      <form>
        <label>Username</label>
        <input type="text" name="username" value={user.username}></input>
        <label>Email</label>
        <input type="email" name="username" value={user.email}></input>
        <label>First Name</label>
        <input type="text" name="username" value={user.firstName}></input>
        <label>Last Name</label>
        <input type="text" name="username" value={user.lastName}></input>

        <button type="submit">Save</button>
      </form>
    );
  }
}

export default connect(
  state => {
    const { auth } = state
    return { auth }
  }
)(SettingsForm);

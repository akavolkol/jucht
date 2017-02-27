import React, { Component } from 'react'


export default class SettingsForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <form>
        <label>Username</label>
        <input type="text" name="username"></input>
        <label>Email</label>
        <input type="email" name="username"></input>
        <label>First Name</label>
        <input type="text" name="username"></input>
        <label>Last Name</label>
        <input type="text" name="username"></input>
      </form>
    );
  }
}

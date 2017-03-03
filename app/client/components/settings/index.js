import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../../actions/users'
import './settings.scss'
import { uploadImage } from '../../actions/media'

class SettingsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.auth.user.username,
      email: this.props.auth.user.email,
      firstName: this.props.auth.user.firstName || '',
      lastName: this.props.auth.user.lastName || '',
      avatar: this.props.auth.user.avatar || null
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.media.uploaded) {
      this.setState({ avatar: newProps.media.path});
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.email) {
      this.props.updateUser({
        _id: this.props.auth.user._id,
        username: this.state.username,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        avatar: this.state.avatar
      });
    }
  }

  onInputUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  onInputEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  onInputFirstName = (event) => {
    this.setState({ firstName: event.target.value });
  }

  onInputLastName = (event) => {
    this.setState({ lastName: event.target.value });
  }

  onFilesSelect = (event) => {
    const loaded = event.target.files;

    for (let number = 0; number < loaded.length; number++) {
      let loadedItem = loaded[number];
      if (loadedItem.type.match('image.*')) {
        this.onLoad(loadedItem);
      }
    }
  }

  onLoad(file) {
    let formData = new FormData();

    formData.append('file', file);
    this.props.uploadImage(formData);
  }

  render() {

    return(
      <div className="settings">
          <label>Account photo</label>
      <form onSubmit={this.onSubmit}>
          <div className="account-photo">
            <div className="account-photo-image">
              <img src={this.state.avatar ? this.state.avatar : '/images/no-avatar.png'} />
              </div>
              <div>
                <span className="btn btn--medium upload-button" type="button">Upload from computer
                  <input
                    type="file"
                    name="file"
                    accept="image/*"
                    multiple
                    onChange={this.onFilesSelect}
                />
              </span>
              </div>
</div>
        <label>Username</label>
        <input type="text" name="username" onChange={this.onInputUsername} value={this.state.username}></input>
        <label>Email</label>
        <input type="email" name="username" onChange={this.onInputEmail} value={this.state.email}></input>
        <label>First Name</label>
        <input type="text" name="username" onChange={this.onInputFirstName} value={this.state.firstName}></input>
        <label>Last Name</label>
        <input type="text" name="username" onChange={this.onInputLastName} value={this.state.lastName}></input>

        <button type="submit">Save</button>
      </form>
    </div>
    );
  }
}

export default connect(
  state => {
    const { auth, media } = state
    return { auth, media }
  },
  { updateUser, uploadImage }
)(SettingsForm);

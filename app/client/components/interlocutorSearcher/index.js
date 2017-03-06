import React, { Component } from 'react'
import { Link } from 'react-router'
import debounce from 'debounce'
import { search } from '../../actions/users'
import { join as joinConveration } from '../../actions/conversations'
import { connect } from 'react-redux'
import './style.scss'
import { assets } from '../../utils/crossResources'

class InterlocutorSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.socket = this.props.socket;
  }

  doSearch = debounce((value) => {
      this.props.search(value);
  }, 500);

  onEnterConversation(user) {
    const conversation = {
      participants: [user]
    }
    this.props.joinConveration(conversation);
    this.socket.emit('updatedConversations', [user._id]);
    this.setState({ value: '' });
  }

  search = (event) => {
    let value = event.target.value;
    value = value.trim();

    value && this.doSearch(value);
    this.setState({ value: value });
  }

  onChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    const { users } = this.props.users;

    return(
      <div className="interlocutor-seacher">
        <input name="interlocutor-seacher"
          onChange={this.search}
          value={this.state.value}
          placeholder="Input some username"
        />
        { (this.state.value && users.length)
          ? <ul className="results">
              <h3>Search results:</h3>
              { users.map((user, id) => {
                  return <li className="aside__menu-item" key={id}>
                      <a onClick={() => this.onEnterConversation(user)} className="aside__menu-item-inner">
                      <div className="aside__menu-avatar">
                        <img src={user.avatar ? user.avatar : assets("images/no-avatar.png")}/>
                      </div>
                      <div className="aside__menu-content">{user.username}</div>
                    </a>
                  </li>
                })
              }
            </ul>
          : null
        }
      </div>
    )
  }
}

export default connect(
  state => {
    const { users } = state
    return { users }
  },
  { search, joinConveration }
)(InterlocutorSearcher);

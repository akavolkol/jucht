import React, { Component } from 'react'
import { Link } from 'react-router'
import debounce from 'debounce'
import { search } from '../../actions/users'
import { join as joinConveration } from '../../actions/conversations'
import { connect } from 'react-redux'
import './style.scss'

class InterlocutorSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.debounce = debounce((e) => {this.onSearchInput(e)}, 400);
  }

  onSearchInput(event) {
    const value = event.target.value.trim();

    if (value && value != this.state.value) {
      this.props.search(value);
    }

    this.setState({ value: value });
  }

  onEnterConversation(user) {
    const conversation = {
      participants: [user]
    }
    this.props.joinConveration(conversation);
  }

  search = (event) => {
    event.persist();
    this.debounce(event);
  }

  render() {
    const { users } = this.props.users;

    return(
      <div className="interlocutor-seacher">
        <input name="interlocutor-seacher" onInput={this.search} placeholder="Input some username"></input>
        { (this.state.value && users.length)
          ? <ul className="results">
              <h3>Search results:</h3>
              { users.map((user, id) => {
                  return <li className="aside__menu-item" id={id}>
                      <a onClick={() => this.onEnterConversation(user)} className="aside__menu-item-inner">
                      <div className="aside__menu-avatar">
                        <img src="/images/logo.png"/>
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

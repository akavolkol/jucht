import React, { Component } from 'react'
import { Link } from 'react-router'
import debounce from 'debounce'
import { search } from '../../actions/users'
import { connect } from 'react-redux'
import './style.scss'

class InterlocutorSearcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.debounce = debounce((e) => {this.onSearchInput(e)}, 200);
  }
  onSearchInput(event) {
   const value = event.target.value.trim();

   if (value != this.state.value) {
    //this.setState({value: value})
    this.props.search(value);
   }
 }

 componentWillReceiveProps(newProps) {
   console.log(newProps);
 }

 search = (event) => {
   event.persist();
   this.debounce(event);
 }

 // renderUsers() {
 //   return(
 //
 //   )
 // }

  render() {

    const { users } = this.props.users;
    return(
      <div className="interlocutor-seacher">
        <input name="interlocutor-seacher" onInput={this.search}></input>
        { (users.length)
            ? <ul className="results">
              { users.map((user, id) => {
                  return <li id={id}>
                    <Link to={'/' + user.username}>
                      {user.username}
                    </Link>
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
  {search}
)(InterlocutorSearcher);

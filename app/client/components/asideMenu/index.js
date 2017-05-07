import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'
import './asideMenu.scss'
import './accountOptions.scss'
import InterlocutorSearcher from '../interlocutorSearcher'
import { signout } from '../../actions/auth'
import { connect } from 'react-redux'
import { assets } from '../../utils/crossResources'

class AsideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldAppearAccountOptions: false,
      collapsed: true
    }
  }

  onClickSignout = (event) => {
    event.preventDefault();
    this.props.signout();
  }

  onClickAccountOptions = (event) => {
    event.preventDefault();
    this.setState({ shouldAppearAccountOptions: !this.state.shouldAppearAccountOptions });
  }

  renderAccountOptions() {
    return(
      <ul className="account-options">
        <li className="item">
          <Link to="/settings">
            <div className="account-options__icon">
              <i className="icon option__icon">
                <svg><use xlinkHref={assets('images/bytesize-inline.svg#i-settings')}/></svg>
              </i>
            </div>
            <div className="account-options__label">Settings</div>
          </Link>
        </li>
        <li className="item">
        <a onClick={this.onClickSignout}>
          <div className="account-options__icon">
            <i className="icon option__icon">
              <svg><use xlinkHref={assets('images/bytesize-inline.svg#i-lock')}/></svg>
            </i>
          </div>
          <div className="account-options__label">Logout</div>
        </a>
        </li>
      </ul>
    )
  }

  targetIsDescendant(event, parent) {
    let node = event.target;
    while (node !== null) {
      if (node === parent) return true;
      node = node.parentNode;
    }
    return false;
  }

  handleDocumentClick = (event) => {
    if (!this.state.collapsed && !this.targetIsDescendant(event, ReactDOM.findDOMNode(this))) {
      this.setState({ collapsed: true })
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  renderConversations() {
    const { conversations } = this.props.conversations;
    let preparedConversations = [];
    conversations.map(conversation => {
      conversation.participants.map(participant => {
        if (!conversation.label && participant._id != this.props.auth.user._id) {
          conversation.label = participant.username;
          conversation.logo = participant.avatar;
        }
      });

      preparedConversations.push(conversation);
    });

    return(
       <ul className="aside__menu">
          { preparedConversations.map((conversation) => {
              return <li key={conversation._id} className="aside__menu-item">
                  <Link
                    to={'/conversations/' + conversation._id}
                    className="aside__menu-item-inner"
                    activeClassName="aside__menu-item-inner--active"
                  >
                    <div className="aside__menu-avatar">
                      <img src={conversation.logo ? conversation.logo : assets('images/no-avatar.png')}/>
                      <div className="platform-state connected"></div>
                    </div>
                    <div className="aside__menu-content">{conversation.label}</div>
                    { !!conversation.messages.length
                      && <span className="indicator">{ conversation.messages.length }</span>
                    }
                  </Link>
                </li>
            })
          }
          </ul>
    )
  }

  toogleAside = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

	render() {
    const user = this.props.auth.user;

		return (
      <aside className={'aside' + (this.state.collapsed ? ' aside--collapsed' : '')}>
        <div className="aside__header">
          <Link className="aside__logo" to="/" >
            <img src={this.props.auth.user.avatar ? this.props.auth.user.avatar : assets('images/no-avatar.png')}/>
          </Link>
          <span className="aside__title">{user.username}</span>
          <div className="option">
          <div onClick={this.onClickAccountOptions}>
            <i className="icon option__icon">
              <svg><use xlinkHref={assets('images/bytesize-inline.svg#i-ellipsis-vertical')}/></svg>
            </i>
            { this.state.shouldAppearAccountOptions && this.renderAccountOptions() }
          </div>
        </div>
        <div className="aside__menu-toogle" onClick={this.toogleAside}>
          <i className="icon option__icon">
            <svg><use xlinkHref={assets('images/bytesize-inline.svg#i-menu')}/></svg>
          </i>
        </div>
        </div>

        <InterlocutorSearcher socket={this.props.socket}/>

        <div className="aside__navigation">
          <div className="aside__scroll">  
          { !!this.props.conversations && this.renderConversations() }
      </div>
        </div>
        {/*
        <div className="aside__actions">
          <button className="action-button">+</button>
        </div> */}
      </aside>
		)
	}
}

export default connect(
  state => {
    const { conversations, auth } = state
    return { conversations, auth }
  },
  { signout }
)(AsideMenu)

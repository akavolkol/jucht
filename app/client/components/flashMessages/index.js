import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlashMessage from './message';

import {loadFlashMessages} from '../../actions/flashMessages';
import '../../styles/flashMessages.scss';

class FlashMessages extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadFlashMessages();
  }

  render() {
    const {flashMessages} = this.props.flashMessages;
    if (flashMessages.length > 0) {
      return(
        <div className="flash-messages">
          <ul>
            {
              flashMessages.map((message, key) => {
                return (
                  <FlashMessage message={message} key={key}/>
                )
              })
            }
          </ul>

        </div>
      )
    } else {
      return(
        null);
      }


    }
  }

  function mapStateToProps(state) {
    const {
      flashMessages
    } = state;

    return {
      flashMessages
    };
  }

  export default connect(mapStateToProps, {loadFlashMessages})(FlashMessages)

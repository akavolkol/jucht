import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteFlashMessage} from '../../actions/flashMessages';

class FlashMessage extends Component {

  constructor() {
    super();
    this.state = {
      active: true
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
          this.props.deleteFlashMessage(this.props.key);
        }, 20000);
  }

  close(e) {
    this.props.deleteFlashMessage(this.props.key);

    //this.setState({active: false});
  }

  render() {
    const {message} = this.props;

    return(


      <div>
      { (this.state.active) ?
      <li className={"flash-messages__item " + (message.type ? 'flash-messages__item--' + message.type : '')}>
          <span className="flash-messages__item-title">{message.title}</span>
          <p>{message.body}</p>
          <i className="icon icon-close flash-messages__close" onClick={(e) => this.close()}></i>
        </li>
         : null
    }
      </div>
        )

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
export default connect(mapStateToProps, {deleteFlashMessage})(FlashMessage)

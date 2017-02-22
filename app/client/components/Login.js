var React = require('react');
var PropTypes = React.PropTypes;

function Login(props) {
	return (
		<div>
			<div className="login-bg"></div>	
			<h1 className="form-header">Login</h1>	
			<form action="/login" method="POST" onSubmit={props.onLoginSubmit}>
				<div className="form-group">
					<label htmlFor="login-username">Username:</label>
	    		<input type="text" className="form-control" id="loginUsername" onChange={props.onFieldChange} required />
				</div>
				<div className="form-group">
			    <label htmlFor="login-password">Password:</label>
			    <input type="password" className="form-control" id="loginPassword" onChange={props.onFieldChange} required />
			  </div>
			  <div className={(props.validationMessage ? 'show ' : '') + "registration-message"}>
					{props.validationMessage}
				</div>
				<button type="submit" className="btn btn-default form-submit" disabled={props.validationPassed}>Submit</button>
			</form>
		</div>
	)
}

Login.propTypes = {
	onFieldChange: PropTypes.func.isRequired,
	onLoginSubmit: PropTypes.func.isRequired,
	validationMessage: PropTypes.string.isRequired,
	validationPassed: PropTypes.bool.isRequired
};

module.exports = Login;
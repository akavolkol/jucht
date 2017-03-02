var bcrypt = require('bcryptjs');

module.exports.loginValidation = function(userInfo, db, callback) {
	var username = userInfo.username;
	var password = userInfo.password;

	if(!username || !password) {
		return callback(false, 'Please fill out all fields before submitting.');
	}

	// check for userDoc via username
	db.collection('users').findOne({ username: username })
	.then(function(userDoc) {
		if (userDoc === null) {
			return callback(false, 'That username does not belong to a registered user.');
		} else {
			// check passwords match
			bcrypt.compare(password, userDoc.passwordHash, function(err, result) {
				if (err) {
					console.log('An error occurred during bcrypt comparison: ', err);
					return callback(false, 'A server error occurred while attempting to validate your information.\nPlease try again later.');
				}

				if (result) {
					return callback(true, userDoc._id);
				} else {
					return callback(false, 'The password you have provided is incorrect.');
				}
			});
		}
	})
	.catch(function(err) {
		console.log('Login database check error: ', err);
		return callback(false, 'A server error occurred while attempting to validate your information.\nPlease try again later.');
	});
}

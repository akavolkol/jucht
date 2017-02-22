var bcrypt = require('bcryptjs');
var MongoClient = require('mongodb').MongoClient;

function registerUser(userInfo, db, callback) {

	// generate hashed & salted pass
	bcrypt.hash(userInfo.password, 10, function(err, hash) {
		if (err) {
			console.log('Hashing error: ', err);
			callback(err);
		}
		userInfo.password = hash;

		// construct userDocument
		var userDocument = {
			"username": userInfo.username,
			"email": userInfo.email,
			"password": userInfo.password,
			"venues": []
		};

		// insert into db
		db.collection('users').insertOne(userDocument)
		.then(function(result) {
			callback(null);
		})
		.catch(function(err) {
			console.log('Registration insertion error: ', err);
			callback(err);
		});
	});	
}

module.exports = registerUser;
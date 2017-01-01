var express = require('express');
var router = express.Router();
var serverValidation = require('../utils/serverValidation.js');
var registrationValidation = serverValidation.registrationValidation;
var loginValidation = serverValidation.loginValidation;
var registerUser = require('../utils/registerUser.js');
var config = require('../config/app.js');
var jwt = require('jsonwebtoken'),
ObjectID = require('mongodb').ObjectID;

// router.use(function(req, res, next) {
//   // check header or url parameters or post parameters for token
//   var token = req.headers['authorization'];
//
//   jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
//     if (err) {
//       return res.status(401).json({
//         message: 'Access danied'
//       });
//     } else {
//       req.user = user; //set the user to req so other routes can use it
//       next();
//     }
//   });
// });

  router.post('/auth/signup', function(req, res, next) {
	// trim fields, except passwords
	var userInfo = {
		username: req.body.username.trim(),
		email: req.body.email,
		password: req.body.password
	};

	registrationValidation(userInfo, req.db, function(validationPassed, failMessage) {
		if (validationPassed) {
			registerUser(userInfo, req.db, function(err) {
				if (err) {
					res.status(400).json({
						serverValidationMessage: 'A server error occurred while attempting to register your information.\nPlease try again later.',
						serverValidationPassed: false
					});
				} else {
					res.json({
						serverValidationMessage: 'You\'ve been successfully registered!',
						serverValidationPassed: true,
            token: jwt.sign({username: user.username}, config.secret, {
                expiresIn: 60 * 24 // expires in 24 hours
              })
					});
				}
			});
		} else {
			res.json({
				serverValidationMessage: failMessage,
				serverValidationPassed: false
			});
		}
	});
});

router.post('/login', function(req, res, next) {
	var user = {
		username: req.body.username.trim(),
		password: req.body.password
	};

	loginValidation(user, req.db, function(validationPassed, validationMessage) {
		if (validationPassed) {
			req.session.userId = validationMessage;
			let token = jwt.sign({username: user.username}, config.secret, {
          expiresIn: 60 * 24 // expires in 24 hours
        });
			res.json({
				serverValidationMessage: 'Login successful!',
				serverValidationPassed: true,
				token: token
			});
		} else {
			res.status(400).json({
				message: validationMessage,
				serverValidationPassed: false
			});
		}
	});
});

/**
 * Logout user
 */
router.all('/logout', function (request, response) {
  request.session.destroy();
  response.json({result: 'ok'});
});

/**
 * List of users
 */
router.get('/users', function (request, response) {
  const query = request.query.query ? (request.query.query).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') : null;

  if (query) {
    request.db
      .collection('users')
      .find({
        username: new RegExp('^' + query + '.*', 'gi')
      })
      .toArray(function (err, users) {
        response.json(users);
      });
  } else {
    response.status(500).json({message: 'Wrong query'});
  }

});

/**
 * Get specific user
 */
router.get('/users/:id', function (request, response) {
  request.db
    .collection('users')
    .find({'_id': new ObjectID(request.params.id)})
    .toArray(function (err, user) {
      user.length > 0
        ? response.json(user)
        : response.status(404).json({message: 'Not found'});
    });
});


module.exports = router;

import express, { Router } from 'express'
import { ObjectID } from 'mongodb'
import serverValidation from '../../utils/serverValidation.js'
import registerUser from '../../utils/registerUser.js'
import config from '../../config/app.js'

var registrationValidation = serverValidation.registrationValidation;
var loginValidation = serverValidation.loginValidation;

export default function () {
  const router = Router();

  /**
  * List of users
  */
  router.get('/', function (request, response) {
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
  router.get('/:id', function (request, response) {
    request.db
    .collection('users')
    .find({'_id': new ObjectID(request.params.id)})
    .toArray(function (err, user) {
      user.length > 0
      ? response.json(user)
      : response.status(404).json({message: 'Not found'});
    });
  });

  router.post('/', function(req, res, next) {
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

  return router;
}

import express, { Router } from 'express'
import { ObjectID } from 'mongodb'
import serverValidation from '../../utils/serverValidation.js'
import registerUser from '../../utils/registerUser.js'
import config from '../../config/app.js'
import Mongo from '../../db/mongo'
import User from '../../repositories/user'

var registrationValidation = serverValidation.registrationValidation;
var loginValidation = serverValidation.loginValidation;



export default function () {
  const router = Router();
  const db = new Mongo().connection;
  const userRepository = new User();


  /**
  * List of users
  */
  router.get('/', (request, response) => {

    const query = request.query.query ? (request.query.query).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') : null;
    if (query) {
      userRepository.findByUsername(
          new RegExp('^' + query + '.*', 'gi'),
          request.session.userId
        )
        .then(users => response.json(users))
    } else {
      response.status(500).json({message: 'Wrong query'});
    }

  });

  /**
  * Get specific user
  */
  router.get('/:id', function (request, response) {
    let user = userRepository.getUser(request.params.id)
      .then((user) => response.json(user))
      .catch(() => response.status(404).json({message: 'Not found'}));
  });

  router.post('/', function(request, response, next) {
	// trim fields, except passwords
	var userInfo = {
		username: request.body.username.trim(),
		email: request.body.email,
		password: request.body.password
	};

	registrationValidation(userInfo, db, function(validationPassed, failMessage) {
		if (validationPassed) {
			registerUser(userInfo, db, function(err) {
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

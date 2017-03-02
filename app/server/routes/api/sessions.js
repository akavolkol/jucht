import express, { Router } from 'express'
import jwt from 'jsonwebtoken'
import config from '../../config/app.js'
import serverValidation from '../../utils/serverValidation.js'
import Mongo from '../../db/mongo'
import bcrypt from 'bcryptjs'
import User from '../../repositories/user'

var loginValidation = serverValidation.loginValidation;

export default function () {
  const router = Router();
  const db = new Mongo().connection;
  const userRepository = new User();

  router.post('/', function(request, response, next) {
    const inputData = {
      username: request.body.username.trim(),
      password: request.body.password
    };

    userRepository.getUserAllDataByUsername(inputData.username)
      .then(user => {
        if (user) {
          bcrypt.compare(inputData.password, user.passwordHash, (err, passwordMatched) => {
            if (err || !passwordMatched) {
              return next(new Error('Wrong login data'));
            }
            request.session.userId = user._id;
            delete user.passwordHash;

            response.json({
              token: jwt.sign({username: user.username}, config.secret, {
                expiresIn: 60 * 24
              }),
              user: user
            });
          });
        } else {
          throw new Error('User with that criterias not found');
        }
      })
      .catch(next);
  });

  /**
  * Logout user
  */
  router.delete('/', function (request, response) {
    request.session.destroy();
    response.json({result: 'ok'});
  });


  return router;
}

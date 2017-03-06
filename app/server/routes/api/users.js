import express, { Router } from 'express'
import { ObjectID } from 'mongodb'
import config from '../../config/app.js'
import Mongo from '../../db/mongo'
import User from '../../repositories/user'
import jwt from 'jsonwebtoken'

export default function () {
  const router = Router();
  const db = new Mongo().connection;
  const userRepository = new User();

  /**
  * List of users
  */
  router.get('/', (request, response, next) => {
    const query = request.query.query ? (request.query.query).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') : null;

    if (query) {
      userRepository.findByUsername(
          new RegExp('^' + query + '.*', 'gi'),
          request.session.user.id
        )
        .then(users => response.json(users))
        .catch(next);
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

  router.post('/', (request, response, next) => {
    const userInfo = {
      username: request.body.username.trim(),
      email: request.body.email,
      password: request.body.password
    };

    userRepository.create(userInfo)
        .then((user) => {
          request.session.userId = user._id;
          response.json({
            token: jwt.sign({username: user.username}, config.secret, {
              expiresIn: 60 * 24 // expires in 24 hours
            }),
            user: user
          });
        })
        .catch(next);
  });

  router.put('/:id', (request, response, next) => {
    userRepository.update(request.params.id, request.body)
        .then((user) => {
          response.json(user);
        })
        .catch(next);
  });

  return router;
}

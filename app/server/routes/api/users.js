import { Router } from 'express'
import config from '../../config/app.js'
import User from '../../repositories/user'
import jwt from 'jsonwebtoken'
import Session from '../../repositories/session'

const SESSION_DURATION = 60 * 60 * 24;

export default function () {
  const router = Router();
  const userRepository = new User();
  const sessionRepository = new Session();

  /**
  * List of users
  */
  router.get('/', (request, response, next) => {
    const query = request.query.query ? (request.query.query).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') : null;
    if (query) {
      userRepository.findByUsername(
          new RegExp('^' + query + '.*', 'gi'),
          request.session.user._id
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
    userRepository.getUser(request.params.id)
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
          const token = jwt.sign({username: user.username}, config.secret, { expiresIn: SESSION_DURATION });

          delete user.passwordHash;
          let date = new Date();
          date.setSeconds(date.getSeconds() + SESSION_DURATION);

          sessionRepository.create({
            token: token,
            user: user
          });

          let domain = config.appHost.replace(/(http:\/\/)|(\/$)/g, '');

          response.cookie('token', token, { domain: domain, expires: date, httpOnly: true })
              .json({
                token: token,
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

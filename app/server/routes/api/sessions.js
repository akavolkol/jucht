import { Router } from 'express'
import jwt from 'jsonwebtoken'
import config from '../../config/app.js'
import bcrypt from 'bcryptjs'
import User from '../../repositories/user'
import Session from '../../repositories/session'


export default function () {
  const router = Router();
  const userRepository = new User();
  const sessionRepository = new Session();

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

            const token = jwt.sign({username: user.username}, config.secret, { expiresIn: 60 * 24 });

            delete user.passwordHash;

            sessionRepository.create({
              token: token,
              user: user
            });

            let date = new Date();
            date.setSeconds(date.getSeconds() + 60 * 60 * 24)

            return response
            .cookie('token', token, { domain: 'localhost', expires: date, httpOnly: true })
            .json({
              token: token,
              user: user
            })
            ;
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
    if (request.session) {
      sessionRepository.removeByUserId(request.session.user._id).then(() => response.json({message: 'ok'}));
      //response.clearCookie('token');
    }
  });

  router.get('/current', (request, response) => {
    if (!request.session) {
      return response.status(401).json({message: 'Expired'});
    }
    userRepository.getUser(request.session.user._id)
      .then((user) => {
        if (user) {
          response.json({user: user})
        } else {
          response.status(401).json({message: 'Expired'})
        }
      })
      .catch(() => response.status(404).json({message: 'Not found'}));
  });

  return router;
}

import { Router } from 'express'
import mediaRouter from './media'
import usersRouter from './users'
import sessionsRouter from './sessions'
import conversationsRouter from './conversations'
import jwt from 'jsonwebtoken'
import config from '../../config/app.js'
import NotFoundError from '../../errors/notFound'
import Session from '../../repositories/session'

export default function () {
  const router = Router();
  const sessionRepository = new Session();

  router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

  /**
  * Secure routes
  */
  router.use(function(req, res, next) {
    if (!/sessions/.test(req.path) && !(/users/.test(req.path) && req.method == 'POST')) {
      if (!req.session) return res.status(401).json({ error: 'Access danied' });
      jwt.verify(req.session.token, config.secret, function(err, user) {
        if (err) {
          sessionRepository.removeByUserId(req.session.user._id);
          return res.status(401).json({ error: 'Access danied' });
        } else {
          next();
        }
      });
    } else {
      next();
    }


  });

  router.use('/media', mediaRouter());
  router.use('/users', usersRouter());
  router.use('/sessions', sessionsRouter());
  router.use('/conversations', conversationsRouter());

  router.use(() => {
    throw new NotFoundError('API route not found');
  });

  return router;
}

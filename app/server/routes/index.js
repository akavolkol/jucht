import { Router } from 'express'
import apiRouter from './api'
import config from '../config/app'
import User from '../repositories/user'

export default function () {
  const router = Router();
  const userRepository = new User();

  router.use('/api', apiRouter());

  router.get('*', function(req, res) {
    let preloadData = {
      environment: config.environment,
      webpackServer: config.webpackServer,
      initialAppData: JSON.stringify({}),
      config: JSON.stringify({
        host: config.appHost,
        clientType: 'web'
      })
    };
      if (req.session) {

        let userV;
        Promise.all([userRepository.getUser(req.session.user._id).then((user) => {userV = user})]).then(val => {
          res.render('layout.ejs', {
            ...preloadData,
            initialAppData: JSON.stringify({
              auth: {
                user: userV,
                authenticated: true
              }
            })
          });
        }).catch(e => new Error(e));
      } else {
        res.render('layout.ejs', preloadData);
      }

  });

  return router;
}

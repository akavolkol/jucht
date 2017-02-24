import express, { Router } from 'express'
import apiRouter from './api'
import config from '../config/app'
import Mongo from '../db/mongo'
import User from '../repositories/user'

export default function () {
  const router = Router();
  const db = new Mongo().connection;
  const userRepository = new User();

  router.use('/api', apiRouter());

  router.get('*', function(req, res) {
      if (req.session.userId) {

        let userV;

        Promise.all([userRepository.getUser(req.session.userId).then((user) => {userV = user[0]})]).then(val => {
          res.render('layout.ejs', {
            environment: config.environment,
            webpackServer: config.webpackServer,
            initialAppData: JSON.stringify({
              auth: {
                user: userV,
                authenticated: true
              }
            })
          });
        });
      } else {
      }

  });

  return router;
}

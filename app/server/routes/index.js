import express, { Router } from 'express'
import apiRouter from './api'
import config from '../config/app'

export default function () {
  const router = Router();

  router.use('/api', apiRouter());

  router.get('*', function(req, res) {
  	res.render('layout.ejs', {
      environment: config.environment,
      webpackServer: config.webpackServer
    });
  });

  return router;
}

import express, { Router } from 'express'
import apiRouter from './api'

export default function () {
  const router = Router();

  //router.use('/api', apiRouter());

  router.get('*', function(req, res) {
  	res.render('layout.ejs');
  });

  return router;
}

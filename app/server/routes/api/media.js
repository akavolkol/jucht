import express, { Router } from 'express'

export default function () {
  const router = Router();

  router.post('/images', function (req, res) {
    res.status(201).json({
      path: 'http://images.indianexpress.com/2015/11/nasa-big1.jpg'
    });
  });

  router.delete('/images', function (req, res) {
    res.json({message: 'Removed'});
  });

  return router;
}

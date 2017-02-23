import express, { Router } from 'express'

export default function () {
  const router = Router();

  /**
   * List of available converstaions
   */
  router.get('/', (req, res) => {

  });

  /**
   * Receive data from certain converstaion
   */
  router.get('/:id', (req, res) => {

  });

  /**
   * Join new converstaion
   */
  router.post('/', (req, res) => {
    res.status(201).json({
      path: 'http://images.indianexpress.com/2015/11/nasa-big1.jpg'
    });
  });



  return router;
}

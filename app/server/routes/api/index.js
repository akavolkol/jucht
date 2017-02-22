import express, { Router } from 'express'
import mediaRouter from './media'
import usersRouter from './users'

export default function () {
  const router = Router();

  router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// router.use(function(req, res, next) {
//   // check header or url parameters or post parameters for token
//   var token = req.headers['authorization'];
//
//   jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
//     if (err) {
//       return res.status(401).json({
//         message: 'Access danied'
//       });
//     } else {
//       req.user = user; //set the user to req so other routes can use it
//       next();
//     }
//   });
// });

  router.use('/media', mediaRouter());
  router.use('/users', usersRouter());
  //router.use('/session', mediaRouter());

  return router;
}

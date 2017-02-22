import express, { Router } from 'express'
import jwt from 'jsonwebtoken'

export default function () {
  const router = Router();

  router.post('/', function(req, res, next) {
    var user = {
      username: req.body.username.trim(),
      password: req.body.password
    };

    loginValidation(user, req.db, function(validationPassed, validationMessage) {
      if (validationPassed) {
        req.session.userId = validationMessage;
        let token = jwt.sign({username: user.username}, config.secret, {
          expiresIn: 60 * 24 // expires in 24 hours
        });
        res.json({
          serverValidationMessage: 'Login successful!',
          serverValidationPassed: true,
          token: token
        });
      } else {
        res.status(400).json({
          message: validationMessage,
          serverValidationPassed: false
        });
      }
    });
  });

  /**
  * Logout user
  */
  router.delete('/', function (request, response) {
    request.session.destroy();
    response.json({result: 'ok'});
  });


  return router;
}

import express, { Router } from 'express'
import fs from 'fs'
import busboy from 'connect-busboy'
import path from 'path'
import config from '../../config/app'

export default function () {
  const router = Router();

  router.use(busboy({ immediate: true }));

  router.post('/images', (request, response) => {
    request.busboy.on('file', (fieldname, file, fileName, encoding, mimetype) => {
      const filename = (Date.now() + fileName).replace(/\s/g, '');
      file.on('data', function(data) {
        fs.writeFileSync(path.join('./public/uploads/images/', filename), data, 'binary');
      });
      file.on('end', function() {
        response.status(201).json({path: `${config.appHost}/uploads/images/${filename}`});
      });
    });
 });

  router.delete('/images', function (req, res) {
    res.json({message: 'Removed'});
  });

  return router;
}

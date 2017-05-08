import { Router } from 'express'
import fs from 'fs'
import busboy from 'connect-busboy'
import path from 'path'
import config from '../../config/app'
import mkdirp from 'mkdirp'

export default function () {
  const router = Router();

  router.use(busboy({ immediate: true }));

  router.post('/images', (request, response) => {
    request.busboy.on('file', (fieldname, file, fileName, encoding, mimetype) => {
      const filename = (Date.now() + fileName).replace(/\s/g, '');
      file.on('data', function(data) {
        const pathDest = './public/uploads/images/';
        !fs.existsSync(pathDest) && mkdirp.sync(pathDest);
        fs.writeFileSync(path.join(pathDest, filename), data, 'binary');
      });
      file.on('end', function() {
        response.status(201).json({path: `${config.appHost}/uploads/images/${filename}`});
      });
    });
 });

  return router;
}

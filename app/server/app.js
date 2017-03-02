import express from 'express'
import routes from './routes'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import config from './config/app.js'
import jwt from 'jsonwebtoken'
import Mongo from './db/mongo'
import socketio from 'socket.io'
import BadRequestError from './errors/badRequest'
import NotFoundError from './errors/notFound'

const app = express();
const MongoStore = connectMongo(session);

(new Mongo({ host: config.dbHost })).connect().then((connection) => {
  app.use(session({
    secret: config.secret,
    store: new MongoStore({ db: connection }),
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true
    }
  }));

  app.use(express.Router());
  app.use(routes());
  app.use((error, request, response, next) => {
    if (request.xhr) {
      let status = 500;

      if (error instanceof BadRequestError) {
        status = 400;
      } else if (error instanceof NotFoundError) {
        status = 404;
      }

      if (config.environment == 'development') {
        console.log(error);
      }

      response.status(status).send({ error: error.toString() });
    } else {
      next(error);
    }

  });
}).catch(e => {
  console.log(e);
  process.exit(1);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));

let server = app.listen(process.env.PORT || 9000, console.log('Server is running...'));

const socket = socketio.listen(server);
socket.on('connection', function (socket) {

  socket.on('join', (username) => {
    socket.username = username;
  });

  socket.on('typing', (conversationId) => {
    socket.broadcast.to(conversationId).emit('typing', {username: socket.username});
  });

  // when the user disconnects.. perform this
  // socket.on('disconnect', function () {
  // });
});


export default app;

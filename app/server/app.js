import express from 'express'
import routes from './routes'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import config from './config/app.js'
import Mongo from './db/mongo'
import socketio from 'socket.io'
import BadRequestError from './errors/badRequest'
import NotFoundError from './errors/notFound'
import Session from './repositories/session'

const app = express();
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../public')));


(new Mongo({ host: config.dbHost })).connect().then((connection) => {
  const sessionRepository = new Session();
  app.use(function(request, res, next) {
    let token = request.headers.authorization
      ? request.headers.authorization.split(' ')[1]
      : request.cookies.token;
    sessionRepository.getByToken(token).then((session) => {
      request.session = session;
      app.use((error, request, response, next) => {
        if (request.xhr) {
          let status = 500;

          if (error instanceof BadRequestError) {
            status = 400;
          } else if (error instanceof NotFoundError) {
            status = 404;
          }

          if (config.environment == 'development' && status == 500) {
            console.log(error);
          }

          response.status(status).send({ error: error.toString() });
        } else {
          next(error);
        }

      });
      app.use(express.Router());
      app.use(routes());
      app.disable('x-powered-by');
      next();
    });

  });


}).catch(e => {
  console.log(e);
  process.exit(1);
});


let server = app.listen(process.env.PORT || 9000, console.log('Server is running...'));

const socket = socketio.listen(server);
let clients = [];

socket.on('connection', function (socket) {
  socket.on('join', (user) => {
    if (user) {
      socket.user = user;
      clients.push(socket);
    }
  });

  socket.on('conversation', (conversationId) => {
    conversationId && socket.join(conversationId);
  })

  socket.on('leaveConversation', conversationId => {
    socket.leave(conversationId)
  });

  socket.on('typing', (conversationId) => {
    if (socket.user) {
      socket.broadcast.to(conversationId).emit('typing', socket.user.username);
    }
  });

  socket.on('updatingConversation', (conversationId) => {
    socket.broadcast.to(conversationId).emit('conversationUpdated');
  });

  socket.on('disconnect', function () {
    clients.map(client => {
      if (client.user && client.user._id == socket.user._id) {
        clients.splice(clients.indexOf(client), 1);
      }
    })
  });
});


export default app;

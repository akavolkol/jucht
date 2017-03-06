import express from 'express'
import routes from './routes'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import config from './config/app.js'
import jwt from 'jsonwebtoken'
import Mongo from './db/mongo'
import socketio from 'socket.io'
import BadRequestError from './errors/badRequest'
import NotFoundError from './errors/notFound'
import Session from './repositories/session'

const app = express();
app.use(cookieParser());

(new Mongo({ host: config.dbHost })).connect().then((connection) => {
  const sessionRepository = new Session();
  app.use(function(request, res, next) {
    request.session = null;
    let token = request.cookies.token ? request.cookies.token : request.headers.authorization && request.headers.authorization.split(' ')[1];
    sessionRepository.getByToken(token).then((session) => {
      request.session = session;
      next();
    });
    app.use(express.Router());
    app.use(routes());
  });

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
}).catch(e => {
  console.log(e);
  process.exit(1);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../public')));

let server = app.listen(process.env.PORT || 9000, console.log('Server is running...'));

const socket = socketio.listen(server);
let clients = [];
socket.on('connection', function (socket) {

  socket.on('join', (user) => {
    socket.user = user;
    clients.push(socket);
  });

  socket.on('conversation', (data) => {
    socket.conversation = data.conversation;
    socket.join(data.conversation._id);
  })

  socket.on('leaveConversation', id => {
    socket.leave(id)
  });

  socket.on('typing', (conversationId) => {
    socket.broadcast.to(conversationId).emit('typing', {username: socket.user ? socket.user.username : null});
  });

  socket.on('updatingConversation', (conversationId) => {
    socket.broadcast.to(conversationId).emit('conversationUpdated');
  });

  socket.on('updatedConversations', (usersIds) => {
    clients.map(client => {

      if (client.user && usersIds.indexOf(client.user.id)) {
        client.emit('conversationsUpdated');
      }
    })

  });

  // when the user disconnects.. perform this
  // socket.on('disconnect', function () {
  // });
});


export default app;

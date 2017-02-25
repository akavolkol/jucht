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

const app = express();
const MongoStore = connectMongo(session);

(new Mongo({ host: config.dbHost })).connect().then((connection) => {
  app.use(session({
    secret: config.secret,
    store: new MongoStore({ db: connection }),
    resave: true,
    saveUninitialized: false
  }));

  // app.use(function(req, res, next) {
  // 	req.db = connection;
  // 	next();
  // });

  app.use(express.Router());
  app.use(routes());
}).catch(e => {
  console.log('Can not connect to DB')}
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));

app.use(function(err, req, res, next) {
  res.status(500).send(err);
});

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

import express from 'express'
import routes from './routes'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import { MongoClient } from 'mongodb'
import connectMongo from 'connect-mongo'
import config from './config/app.js'
import jwt from 'jsonwebtoken'

const app = express();
const MongoStore = connectMongo(session);

let db;

app.use(function(req, res, next) {
	req.db = db;
	next();
});

app.use(session({
  secret: 'secret_placeholder',
  store: new MongoStore({url: config.dbHost}),
  resave: true,
  saveUninitialized: false
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));

MongoClient.connect(config.dbHost, function(err, database) {
  if(err) throw err;

  db = database;
  app.listen(9000, console.log('Server is running...'));
});

const router = express.Router();
app.use(router);
app.use(routes());

export default app;

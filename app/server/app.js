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
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));

app.listen(process.env.PORT || 9000, console.log('Server is running...'));

export default app;

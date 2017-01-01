var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoClient = require('mongodb').MongoClient;
var MongoStore = require('connect-mongo')(session);
var routes = require('./routes/index.js');
var config = require('./config/app.js');
var apiRoutes = require('./routes/api'),
  jwt = require('jsonwebtoken');

var app = express();
var db;

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



app.set('views', 'app/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


MongoClient.connect(config.dbHost, function(err, database) {
  if(err) throw err;

  db = database;
  app.listen(9000, console.log('Server is running...'));
});

app.use('/api', apiRoutes);
app.use('/', routes);


module.exports = app;

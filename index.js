const mongoose = require('mongoose');

const Dishes = require('./models/dishes');
const connectDB = require('./mongodb/Connection');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const express = require('express');
const dishRouter = require('./routes/dishRouter');
const promotionsRouter =require('./routes/promoRouter');
const hostname = 'localhost';
const port = 3000;
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
const url = config.mongoUrl;
const uploadRouter = require('./routes/uploadRouter');

const app = express();
app.use('/imageUpload',uploadRouter);
app.all('*', (req, res, next) => {
    if (req.secure) {
      return next();
    }
    else {
      res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
    }
  });
app.use(cookieParser('12345-67890-09876-54321'));
app.use(bodyParser.json());
app.use('/dishes', dishRouter);
app.use('./promotions', promotionsRouter);
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
  }));  
app.use('/', indexRouter);
app.use('/users', usersRouter);

connectDB();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


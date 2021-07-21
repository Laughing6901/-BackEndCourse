const mongoose = require('mongoose');

const Dishes = require('./models/dishes');
const connectDB = require('./mongodb/Connection');
const bodyParser = require('body-parser');

const express = require('express');
const dishRouter = require('./routes/dishRouter');
const promotionsRouter =require('./routes/promoRouter');
const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use('/dishes', dishRouter);
app.use('./promotions', promotionsRouter);

function auth (req, res, next) {
    console.log(req.headers);
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        next(err);
        return;
    }
  
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');      
        err.status = 401;
        next(err);
    }
  }
  
  app.use(auth);

connectDB();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


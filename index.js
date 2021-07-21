const express = require('express');
const http = require('http');
const morgan = require('morgan');
const hostname = 'localhost';
const port = 3000;

const bodyParser = require('body-parser');
const app = express();

const dishRouter = require('./routes/dishRouter');
const promotionsRouter = require('./routes/promotions');
const leadersRouter = require('./routes/leaders');

app.use('/dishes', dishRouter);
app.use('/promo', promotionsRouter);
app.use('/leaders', leadersRouter);

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.all('/dishes', (req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
});

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
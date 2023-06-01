var createError = require('http-errors');
var http = require('http')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var tutorialRoute = require('./routes/tutorialRoute');

var app = express();
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/tutorialServer';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connect to the server");
}, (err) => {
  console.log(err);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', 3000)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tutorials', tutorialRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = http.createServer(app)
server.listen(3000)

module.exports = app;

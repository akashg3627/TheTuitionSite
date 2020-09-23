var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const passport = require('passport');
require("dotenv").config(); //for env vars

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var levelRouter = require('./routes/levelRouter');
var subjectRouter = require('./routes/subjectRouter');
var chapterRouter = require('./routes/chapterRouter');

mongoose
    .connect(process.env.Mongo_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected", process.env.Mongo_URI))
    .catch((err) => console.log(err.message));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/levels', levelRouter);
app.use('/subjects', subjectRouter);
app.use('/chapters', chapterRouter);


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

module.exports = app;

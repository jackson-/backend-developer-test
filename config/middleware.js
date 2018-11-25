const cookieParser = require('cookie-parser');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

module.exports = (app) => {

  app.use(compression());
  app.use(logger('dev'));
  app.use(helmet());


  app.set('view engine', 'pug');
  app.use('/public', express.static('public'));

  //Parsing routes
  app.use(bodyParser.urlencoded({
    extended: true
  })); 

  app.use(cookieParser());
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
  }));
  
  app.use(passport.initialize());  
  app.use(passport.session()); 

  return app;
}
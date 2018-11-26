const api = require('express').Router();

module.exports = api
  .use('/health-check', (req, res) => res.send('OK'))
  .use('/auth', require('./auth'))
  .use('/user', require('./user'))

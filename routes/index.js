const api = require('express').Router();

module.exports = api
  .use('/health-check', (req, res) => res.send('OK'))
  .use('/auth', require('./auth'))
  .use('/users', require('./user'))
  .use('/games', require('./games'))
  .use('/requests', require('./requests'))
  .use('/matches', require('./matches'))

require('dotenv').config();
const mongoose = require('mongoose');
const routes = require('./routes/index.js');
const helpers = require('./config/helpers.js');
const middleware = require('./config/middleware.js');

const app = require('express')();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGODB_URI || process.env.DB_HOST;
mongoose.Promise = global.Promise;

middleware(app);
mongoose.connect(mongoURL);

app.use('/', routes);

app.listen(port, helpers.listenCallback(port));
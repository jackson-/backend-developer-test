require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const authService = require('./Services/AuthService');
const passportSetup = require('./config/passport-setup');


// MONGODB CONNECTION. mongodb ATLAS

const mongodbUri = process.env.MONGODB_URI;
mongoose.set('useCreateIndex', true);
mongoose.Promise = require('bluebird');
mongoose.connect(mongodbUri, { useNewUrlParser: true });
const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

// Middleware
app.use(function (req, res, next) {
    let allowedOrigins = ['*'];  // list of url-s
    let origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Expose-Headers', 'Content-Disposition');
    next();
});
app.use(passport.initialize());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/'));
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});
app.use('/', require('./routes'))

// start server after mongodb connection is verified.
conn.once('open', function () {
    // Wait for the database connection to establish, then start the app.
    app.listen(process.env.PORT || 3000, function () {
        console.log('Express app listening on port 3000!');
    });
});


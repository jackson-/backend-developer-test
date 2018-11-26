const router = require('express').Router();
const passport = require('passport');
const authService = require('../Services/AuthService');

module.exports = router
    // this will call passport-setup.js authentication in the config directory
    .get('/google', passport.authenticate('google', {
        session: false,
        scope: ['profile', 'email']
    }))
    // callback url upon successful google authentication
    .get('/callback', passport.authenticate('google', {session: false}), (req, res) => {
        authService.signToken(req, res);
    })
    .get('/verify', authService.checkTokenMW, (req, res) => {
        authService.verifyToken(req, res);
        if (null === req.authData) {
            res.sendStatus(403);
        } else {
            res.json(req.authData);
        }
    })

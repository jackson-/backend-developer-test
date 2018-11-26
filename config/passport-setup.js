const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
let mongoose = require('mongoose');
const {User} = require('../Model')

passport.use(
    new GoogleStrategy({
        // options for strategy
        callbackURL: process.env.GOOGLE_CALLBACK,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    }, async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;
        const {displayName} = profile
        // check if user already exists
        const currentUser = await User.findOne({googleId: profile.id});
        if (currentUser) {
            // already have the user -> return (login)
            return done(null, currentUser);
        } else {
            // register user and return
            const newUser = await new User({name: displayName, email: email, googleId: profile.id}).save();
            return done(null, newUser);
        }
    }
));
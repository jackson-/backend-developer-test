const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const config = require('config')

const User = mongoose.model('Users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/callback',
      clientID: config.get('google_client_ID'),
      clientSecret: config.get('google_client_secret'),
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id })
        if (existingUser) {
          return done(null, existingUser)
        }
        const user = await new User({
          googleId: profile.id,
          username: profile.displayName
        }).save()
        done(null, user)
      } catch (err) {
        done(err, null)
      }
    }
  )
)

const express = require('express')
const path = require('path')
const logger = require('morgan')
const passport = require('passport')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const config = require('config')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json')
const indexRoutes = require('./routes/index')
const gamesRoutes = require('./routes/games')
const usersRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const requireLogin = require('./middlewares/requireLogin')
/**
 * EXPRESS APP
 */
const app = express()

/**
 * CONFIG APP
 */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'twig')
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
/**
 * AUTH
 */
require('./services/passport')
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.get('cookie_key')]
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth', authRoutes)

/**
 * SWAGGER
 */
app.use('/api-docs', requireLogin, swaggerUi.serve, swaggerUi.setup(swaggerDocument))

/**
 * ROUTES
 */
app.use('/', indexRoutes)
app.use('/v0/api/games', requireLogin, gamesRoutes)
app.use('/v0/api/users', requireLogin, usersRoutes)

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// Set up mongoose connection
const connectionString = config.get('connection_string')
mongoose.connect(connectionString, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = app

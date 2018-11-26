const User = require('../models/userModel')
// const config = require('config')
// const redis = require('redis')
// const options = {
//   url: config.get('redis_url'),
//   password: config.get('redis_password')
// }
// const clientRedis = redis.createClient(options)
// const { promisify } = require('util')
// const getAsync = promisify(clientRedis.get).bind(clientRedis)

const locationDecorator = (user, req) => {
  // user.location = {
  //   type: 'Point',
  //   coordinates: [req.geoip.longitude, req.geoip.latitude]
  // }
  return user
}
const createUser = (req, res, next) => {
  const user = new User(req.body)
  locationDecorator(user, req)

  user.save(function (err) {
    if (err) {
      console.log(JSON.stringify(err, null, 2))
      next(err)
    } else {
      res.status(201).json(user)
    }
  })
}
const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true, lean: true }, (err, user) => {
    if (err) {
      next(err)
    } else {
      locationDecorator(user, req)
      user.save()
      res.status(200).json(user)
    }
  })
}

const deleteUser = (req, res, next) => {
  User.remove({ _id: req.params.id }, (err, user) => {
    if (err) {
      next(err)
    } else {
      res.send('OK')
    }
  })
}

const getAllUsers = (req, res, next) => {
  User.find().exec(function (err, users) {
    if (err) {
      next(err)
    } else {
      res.json(users)
    }
  })
}

const getUserById = (req, res, next) => {
  User.findOne({ _id: req.params.id }, function (err, user) {
    if (err) {
      next(err)
    } else {
      res.json(user)
    }
  })
}

const getInterestedUsers = async (req, res, next) => {
  try {
    const userId = req.params.id
    const gameId = req.params.gameId
    const userLocation = [
      53.5679386469575,
      10.0117897303544
    ]
    const users = await User.findInterestedUsersForGame(userId, userLocation, gameId)
    res.json(users)
  } catch (e) {
    next(e)
  }

  // const keyRedis = 'interested:' + userId + ':' + gameId
  // const usersRedis = await getAsync(keyRedis)
  // if (usersRedis) {
  //   return res.json(usersRedis)
  // } else {
  // }
}
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getInterestedUsers
}

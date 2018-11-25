const User = require('../models/user')

const createUser = (req, res, next) => {
  const user = new User(req.body)
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
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
    if (err) {
      next(err)
    } else {
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
  User.find(function (err, users) {
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

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}

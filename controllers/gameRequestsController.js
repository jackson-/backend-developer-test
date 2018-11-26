const GameRequest = require('../models/gameRequestModel')

const createGameRequest = (req, res, next) => {
  const gameRequest = new GameRequest(req.body)
  gameRequest.save(function (err) {
    if (err) {
      console.log(JSON.stringify(err, null, 2))
      next(err)
    } else {
      res.status(201).json(gameRequest)
    }
  })
}
const updateGameRequest = (req, res, next) => {
  GameRequest.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, gameRequest) => {
    if (err) {
      next(err)
    } else {
      res.status(200).json(gameRequest)
    }
  })
}

const deleteGameRequest = (req, res, next) => {
  GameRequest.remove({ _id: req.params.id }, (err, gameRequest) => {
    if (err) {
      next(err)
    } else {
      res.send('OK')
    }
  })
}

const getAllGameRequests = (req, res, next) => {
  GameRequest.find(function (err, gameRequests) {
    if (err) {
      next(err)
    } else {
      res.json(gameRequests)
    }
  })
}

const getGameRequestById = (req, res, next) => {
  GameRequest.findOne({ _id: req.params.id }, function (err, gameRequest) {
    if (err) {
      next(err)
    } else {
      res.json(gameRequest)
    }
  })
}

module.exports = {
  createGameRequest,
  getAllGameRequests,
  getGameRequestById,
  updateGameRequest,
  deleteGameRequest
}

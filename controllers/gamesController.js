const Game = require('../models/gameModel')

const createGame = (req, res, next) => {
  const game = new Game(req.body)
  game.save(function (err) {
    if (err) {
      console.log(JSON.stringify(err, null, 2))
      next(err)
    } else {
      res.status(201).json(game)
    }
  })
}
const updateGame = (req, res, next) => {
  Game.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, game) => {
    if (err) {
      next(err)
    } else {
      res.status(200).json(game)
    }
  })
}

const deleteGame = (req, res, next) => {
  Game.remove({ _id: req.params.id }, (err, game) => {
    if (err) {
      next(err)
    } else {
      res.send('OK')
    }
  })
}

const getAllGames = (req, res, next) => {
  Game.find(function (err, games) {
    if (err) {
      next(err)
    } else {
      res.json(games)
    }
  })
}

const getGameById = (req, res, next) => {
  Game.findOne({ _id: req.params.id }, function (err, game) {
    if (err) {
      next(err)
    } else {
      res.json(game)
    }
  })
}

module.exports = {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame
}

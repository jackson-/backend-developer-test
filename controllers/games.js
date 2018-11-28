const {User, Game, Match, Request} = require('../Model');

exports.getAll = async (req, res) => {
        try {
            const games = await Game.find()
            res.status(200).send(games)
        } catch (e){
            res.status(400).send(e.message)
        }
    }

exports.getOne = async (req, res) => {
        try {
            const {gameId} = req.params
            const game = await Game.find({_id: gameId})
            res.status(200).send(game)
        } catch (e){
            res.status(400).send(e.message)
        }
    }

exports.createOne = async (req, res) => {
        try {
            const game = await new Game({...req.body}).save();
            res.status(200).send(game);
        } catch(e) {
            res.status(400).send(e.message)
        }
    }

exports.updateOne = async (req, res) => {
        try{
            const {gameId} = req.params
            const {updates} = req.body
            const game = await Game.findOneAndUpdate({ _id: gameId }, {...updates})
            res.status(200).send(game);
        } catch(e) {
            res.status(400).send(e.message)
        }
    }

exports.deleteOne = async (req, res) => {
        try {
            const {gameId} = req.params
            await Game.deleteOne({ _id: gameId })
            res.sendStatus(200);
        } catch(e) {
            res.status(400).send(e.message)
        }
    }
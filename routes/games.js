const router = require('express').Router();
const authService = require('../Services/AuthService');
const {User, Game, Match, Request} = require('../Model');

module.exports = router
    .get('/', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const games = await Game.find()
            res.status(200).send(games)
        } catch (e){
            res.status(400).send(e.message)
        }
    })
    .get('/:gameId', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const {gameId} = req.params
            const game = await Game.find({_id: gameId})
            res.status(200).send(game)
        } catch (e){
            res.status(400).send(e.message)
        }
    })
    .post('/', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const game = await new Game({...req.body}).save();
            res.status(200).send(game);
        } catch(e)
            res.status(400).send(e.message)
        }
    })
    .put('/:gameId', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try{
            const {gameId} = req.params
            const {updates} = req.body
            const game = await Game.findOneAndUpdate({ _id: gameId }, {...updates})
            res.status(200).send(game);
        } catch(e) {
            res.status(400).send(e.message)
        }
    })
    .delete('/:gameId', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const {gameId} = req.params
            await Game.deleteOne({ _id: gameId })
            res.sendStatus(200);
        } catch(e) {
            res.status(400).send(e.message)
        }
    })
    
    
    


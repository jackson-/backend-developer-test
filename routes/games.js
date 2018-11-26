const router = require('express').Router();
const authService = require('../Services/AuthService');
const {User, Game, GamePreference} = require('../Model');

module.exports = router
    .post('/createGame', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        const game = await new Game({...req.body}).save();
        if(game){
            res.sendStatus(200);
        } else {
            res.sendStatus(301)
        }
    })
    .post('/addPreference', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        const preference = await new GamePreference({ userId:  req.body.userId, gameId: req.body.gameId}).save();
        if(preference){
            res.sendStatus(200);
        } else {
            res.sendStatus(301)
        }
    })


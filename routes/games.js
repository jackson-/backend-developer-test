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
    .get('/matches', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const matches = await Match.find({open: true}).populate('players', ["name", "email", "location", "preferences", "age", "available"])
            res.status(200).send(matches)
        } catch (e){
            res.status(400).send(e.message)
        }        
    })
    .get('/matches/:matchId', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const {matchId} = req.params
            const match = await Match.find({_id: matchId}).populate('players', ["name", "email", "location", "preferences", "age", "available"])
            res.status(200).send(match)
        } catch (e){
            res.status(400).send(e.message)
        }        
    })
    .get('/matches/requests', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const requests = await Request.find({match: req.body.matchId})
            res.status(200).send(requests)
        } catch (e){
            res.status(400).send(e.message)
        }        
    })
    .post('/matches', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try{
            const createdMatch = await new Match({...req.body}).save();
            const match = await Match.find({_id: createdMatch._id}).populate('players', ["name", "email", "location", "preferences", "age", "available"])
            res.status(200).send(match)
        }catch (e){
            res.status(400).send(e.message)
        }        
    })
    .put('/matches/:matchId', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try{
            const {matchId} = req.params
            const {updates} = req.body
            const match = await Match.findOneAndUpdate({ _id: matchId }, {...updates})
            res.status(200).send(match);
        } catch(e) {
            res.status(400).send(e.message)
        }       
    })
    .delete('/matches/:matchId', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const {matchId} = req.params
            await Match.deleteOne({ _id: matchId })
            res.sendStatus(200);
        } catch(e) {
            res.status(400).send(e.message)
        }       
    })
    .get('/requests', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const requests = await Request.find()
            res.status(200).send(requests)
        } catch (e){
            res.status(400).send(e.message)
        }        
    })
    .get('/requests/:requestId', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const {requestId} = req.params
            const request = await Request.find({_id: requestId})
            res.status(200).send(request)
        } catch (e){
            res.status(400).send(e.message)
        }        
    })
    .post('/requests', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const request = await new Request({...req.body}).save();
            res.status(200).send(request)
        } catch (e){
            res.status(400).send(e.message)
        }        
    })
    .put('/requests/:requestId', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const {requestId} = req.params
            const {answer, matchId} = req.body
            await Request.updateOne({_id: requestId}, {answer})
            const request = await Request.findOne({_id: requestId})
            if(answer === true){
                const match = await Match.findOne({ _id: matchId }).populate('game')
                if(match.game.max_players === match.players.length + 1){
                    await Match.updateOne(
                        { _id: matchId },
                        { $addToSet: {players: [ request.user ] }, open: false }
                    )
                } else {
                    await Match.updateOne(
                        { _id: matchId },
                        { $addToSet: {players: [ request.user ] } }
                    )
                }
                return res.sendStatus(200)
            }
            return res.sendStatus(200)
        } catch (e){
            return res.status(400).send(e.message)
        }       
    })
    .delete('/requests/:requestId', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const {requestId} = req.params
            await Request.deleteOne({ _id: requestId })
            res.sendStatus(200);
        } catch(e) {
            res.status(400).send(e.message)
        }       
    })


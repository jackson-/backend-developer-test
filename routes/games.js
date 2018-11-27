const router = require('express').Router();
const authService = require('../Services/AuthService');
const {User, Game, Match, Request} = require('../Model');

module.exports = router
    .post('/createGame', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        const game = await new Game({...req.body}).save();
        if(game){
            res.sendStatus(200);
        } else {
            res.sendStatus(400)
        }
    })
    .post('/createMatch', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try{
            const createdMatch = await new Match({...req.body}).save();
            const match = await Match.find({_id: createdMatch._id}).populate('players', ["name", "email", "location", "preferences", "age", "available"])
            res.status(200).send(match)
        }catch (e){
            res.status(400).send(e.message)
        }        
    })
    .get('/listMatches', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const matches = await Match.find({open: true}).populate('players', ["name", "email", "location", "preferences", "age", "available"])
            res.status(200).send(matches)
        } catch (e){
            res.status(400).send(e.message)
        }        
    })
    .post('/sendRequest', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const request = await new Request({...req.body}).save();
            res.status(200).send(request)
        } catch (e){
            res.status(400).send(e.message)
        }        
    })
    .get('/listRequests', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const requests = await Request.find({match: req.body.matchId})
            res.status(200).send(requests)
        } catch (e){
            res.status(400).send(e.message)
        }        
    })
    .post('/updateRequest', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const {answer, matchId, requestId} = req.body
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
    


const router = require('express').Router();
const authService = require('../Services/AuthService');
const {User, Game, Match, Request} = require('../Model');

module.exports = router
    .get('/', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const matches = await Match.find({open: true}).populate('players', ["name", "email", "location", "preferences", "age", "available"])
            res.status(200).send(matches)
        } catch (e){
            res.status(400).send(e.message)
        }        
    })
    .get('/:matchId', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const {matchId} = req.params
            const match = await Match.find({_id: matchId}).populate('players', ["name", "email", "location", "preferences", "age", "available"])
            res.status(200).send(match)
        } catch (e){
            res.status(400).send(e.message)
        }        
    })
    .get('/requests', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const requests = await Request.find({match: req.body.matchId})
            res.status(200).send(requests)
        } catch (e){
            res.status(400).send(e.message)
        }        
    })
    .post('/', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try{
            const createdMatch = await new Match({...req.body}).save();
            const match = await Match.find({_id: createdMatch._id}).populate('players', ["name", "email", "location", "preferences", "age", "available"])
            res.status(200).send(match)
        }catch (e){
            res.status(400).send(e.message)
        }        
    })
    .put('/:matchId', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try{
            const {matchId} = req.params
            const {updates} = req.body
            const match = await Match.findOneAndUpdate({ _id: matchId }, {...updates})
            res.status(200).send(match);
        } catch(e) {
            res.status(400).send(e.message)
        }       
    })
    .delete('/:matchId', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try {
            const {matchId} = req.params
            await Match.deleteOne({ _id: matchId })
            res.sendStatus(200);
        } catch(e) {
            res.status(400).send(e.message)
        }       
    })
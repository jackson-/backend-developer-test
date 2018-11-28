const {User, Game, Match, Request} = require('../Model');

exports.getAll = async (req, res) => async (req, res) => {
        try {
            const requests = await Request.find()
            res.status(200).send(requests)
        } catch (e){
            res.status(400).send(e.message)
        }        
    }

exports.getOne = async (req, res) => {
        try {
            const {requestId} = req.params
            const request = await Request.find({_id: requestId})
            res.status(200).send(request)
        } catch (e){
            res.status(400).send(e.message)
        }        
    }

exports.createOne = async (req, res) => {
        try {
            const request = await new Request({...req.body}).save();
            res.status(200).send(request)
        } catch (e){
            res.status(400).send(e.message)
        }        
    }

exports.updateOne = async (req, res) => {
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
    }

exports.deleteOne = async (req, res) => {
        try {
            const {requestId} = req.params
            await Request.deleteOne({ _id: requestId })
            res.sendStatus(200);
        } catch(e) {
            res.status(400).send(e.message)
        }       
    }

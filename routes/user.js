const router = require('express').Router();
const authService = require('../Services/AuthService');
const {User} = require('../Model');

module.exports = router
    .post('/update', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        const user = await User.findOneAndUpdate({_id: req.body.user._id}, {...req.body.user})
        if(user){
            res.sendStatus(200);
        } else {
            res.sendStatus(400)
        }
    })
    .post('/listPlayers', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try{
            const {user} = req.body;
            const players = await User.find({preferences: {$in: user.preferences}, _id: {$ne: user._id}}).populate('preferences')
            return res.status(200).send(players)
        } catch(e) {
            return res.status(400).send(e.message)
        }
    })
    .post('/addPreference', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        try{
            await User.updateOne(
                { _id: req.body.userId},
                { $addToSet: {preferences: [ req.body.gameId ] } }
            )
            const user = await User.findOne({ _id: req.body.userId}).populate("preferences")
            res.status(200).send(user);
        } catch(e) {
            res.status(400).send(e.message)
        }
    })


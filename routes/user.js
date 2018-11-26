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


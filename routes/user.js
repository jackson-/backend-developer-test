const router = require('express').Router();
const authService = require('../Services/AuthService');
const User = require('../Model/User');

module.exports = router
    .post('/update', [authService.checkTokenMW, authService.verifyToken], async (req, res) => {
        console.log("BODY", req.body)
        const user = await User.findOneAndUpdate({_id: req.body.user._id}, {...req.body.user})
        console.log("USER", user)
        res.sendStatus(200);
    })


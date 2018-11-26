const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const setLocation = require('../middlewares/setLocation')
router.get('/', usersController.getAllUsers)
router.post('/', setLocation, usersController.createUser)
router.get('/:id', usersController.getUserById)
router.put('/:id', setLocation, usersController.updateUser)
router.delete('/:id', usersController.deleteUser)

router.get('/:id/interested/:gameId', setLocation, usersController.getInterestedUsers)

module.exports = router

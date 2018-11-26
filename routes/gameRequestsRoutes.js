const express = require('express')
const router = express.Router()
const gameRequestController = require('../controllers/gameRequestsController')

router.get('/', gameRequestController.getAllGameRequests)
router.post('/', gameRequestController.createGameRequest)
router.get('/:id', gameRequestController.getGameRequestById)
router.put('/:id', gameRequestController.updateGameRequest)
router.delete('/:id', gameRequestController.deleteGameRequest)

module.exports = router

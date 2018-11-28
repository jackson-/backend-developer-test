const router = require('express').Router();
const authService = require('../Services/AuthService');
const matchesController = require("../controllers/matches")

module.exports = router
    .get('/', [authService.checkTokenMW, authService.verifyToken], matchesController.getAllOpen)
    .get('/:matchId', [authService.checkTokenMW, authService.verifyToken], matchesController.getOne)
    .get('/requests', [authService.checkTokenMW, authService.verifyToken], matchesController.getRequestsForMatch)
    .post('/', [authService.checkTokenMW, authService.verifyToken], matchesController.createOne)
    .put('/:matchId', [authService.checkTokenMW, authService.verifyToken], matchesController.updateOne)
    .delete('/:matchId', [authService.checkTokenMW, authService.verifyToken], matchesController.deleteOne)
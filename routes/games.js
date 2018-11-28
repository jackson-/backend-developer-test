const router = require('express').Router();
const authService = require('../Services/AuthService');
const gameController = require('../controllers/games')

module.exports = router
    .get('/', [authService.checkTokenMW, authService.verifyToken], gameController.getAll)
    .get('/:gameId', [authService.checkTokenMW, authService.verifyToken], gameController.getOne)
    .post('/', [authService.checkTokenMW, authService.verifyToken], gameController.createOne)
    .put('/:gameId', [authService.checkTokenMW, authService.verifyToken], gameController.updateOne)
    .delete('/:gameId', [authService.checkTokenMW, authService.verifyToken], gameController.deleteOne)
    
    
    


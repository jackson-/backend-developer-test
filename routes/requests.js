const router = require('express').Router();
const authService = require('../Services/AuthService');
const requestsController = require("../controllers/requests")

module.exports = router
    .get('/', [authService.checkTokenMW, authService.verifyToken], requestsController.getAll)
    .get('/:requestId', [authService.checkTokenMW, authService.verifyToken], requestsController.getOne)
    .post('/', [authService.checkTokenMW, authService.verifyToken], requestsController.creatOne)
    .put('/:requestId', [authService.checkTokenMW, authService.verifyToken], requestsController.updateOne)
    .delete('/:requestId', [authService.checkTokenMW, authService.verifyToken], requestsController.deleteOne)
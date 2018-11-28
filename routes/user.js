const router = require("express").Router();
const authService = require("../Services/AuthService");
const usersController = require("../controllers/users")

module.exports = router
  .get("/", [authService.checkTokenMW, authService.verifyToken], usersController.getAll)
  .put("/:userId",[authService.checkTokenMW, authService.verifyToken], usersController.updateOne)
  .delete("/:userId",[authService.checkTokenMW, authService.verifyToken], usersController.deleteOne)
  .get("/similarPlayers", [authService.checkTokenMW, authService.verifyToken], usersController.getSimilarPlayers)
  .post("/addPreference",[authService.checkTokenMW, authService.verifyToken], usersController.addPreference);

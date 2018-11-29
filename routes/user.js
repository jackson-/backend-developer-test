const router = require("express").Router();
const authService = require("../Services/AuthService");
const usersController = require("../controllers/users")

module.exports = router
  .get("/", [authService.checkTokenMW, authService.verifyToken], usersController.getAll)
  .get("/:userId",[authService.checkTokenMW, authService.verifyToken], usersController.getOne)
  .put("/:userId",[authService.checkTokenMW, authService.verifyToken], usersController.updateOne)
  .delete("/:userId",[authService.checkTokenMW, authService.verifyToken], usersController.deleteOne)
  .get("/similarPlayers", [authService.checkTokenMW, authService.verifyToken], usersController.getSimilarPlayers)
  .put("/addPreference",[authService.checkTokenMW, authService.verifyToken], usersController.addPreference);

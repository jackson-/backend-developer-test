const router = require("express").Router();
const authService = require("../Services/AuthService");
const { User } = require("../Model");
const mongoose = require("mongoose");

module.exports = router
  .get("/", [authService.checkTokenMW, authService.verifyToken],async (req, res) => {
      try {
        const users = await User.find();
        return res.status(200).send(users);
      } catch (e) {
        return res.status(400).send(e.message);
      }
    }
  )
  .put("/:userId",[authService.checkTokenMW, authService.verifyToken],async (req, res) => {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { ...req.body.updates }
        );
        res.status(200).send(user);
      } catch(e) {
        res.status(400).send(e.message);
      }
    }
  )
  .delete("/:userId",[authService.checkTokenMW, authService.verifyToken],async (req, res) => {
      try {
        await User.deleteOne({ _id: req.params.userId });
        res.sendStatus(200);
      } catch(e) {
        res.status(400).send(e.message);
      }
    }
  )
  .get(
    "/listPlayers",
    [authService.checkTokenMW, authService.verifyToken],
    async (req, res) => {
      try {
        const { user } = req.body;
        const user_id = mongoose.Types.ObjectId(user._id);
        const pref_ids = user.preferences.map((p) => mongoose.Types.ObjectId(p))
        const players = await User.aggregate([
            {
                $geoNear: {
                    near: { 
                    type: "Point",
                    coordinates: user.location.coordinates
                    },
                    distanceField: "dist.calculated",
                    maxDistance: 2,
                    spherical: true
                }
            },
            {
                $match: {
                    _id: { $ne: user_id },
                },
            },
            {
                $match: {
                    preferences: { $in: pref_ids },
                },
            },
        ]);
        return res.status(200).send(players);
      } catch (e) {
        return res.status(400).send(e.message);
      }
    }
  )
  .post(
    "/addPreference",
    [authService.checkTokenMW, authService.verifyToken],
    async (req, res) => {
      try {
        await User.updateOne(
          { _id: req.body.userId },
          { $addToSet: { preferences: [req.body.gameId] } }
        );
        const user = await User.findOne({ _id: req.body.userId }).populate(
          "preferences"
        );
        res.status(200).send(user);
      } catch (e) {
        res.status(400).send(e.message);
      }
    }
  );

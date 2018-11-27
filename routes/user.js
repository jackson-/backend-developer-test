const router = require("express").Router();
const authService = require("../Services/AuthService");
const { User } = require("../Model");
const mongoose = require("mongoose");

module.exports = router
  .post(
    "/update",
    [authService.checkTokenMW, authService.verifyToken],
    async (req, res) => {
      const user = await User.findOneAndUpdate(
        { _id: req.body.user._id },
        { ...req.body.updates }
      );
      if (user) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
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
                    maxDistance: 10,
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

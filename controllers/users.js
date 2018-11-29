const {User} = require('../Model');
const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
      try {
        const users = await User.find();
        return res.status(200).send(users);
      } catch (e) {
        return res.status(400).send(e.message);
      }
    }

exports.getOne = async (req, res) => {
        try {
            const {userId} = req.params
            const user = await User.findOne({_id: userId})
            res.status(200).send(user)
        } catch (e){
            res.status(400).send(e.message)
        }        
    }

exports.getSimilarPlayers = async (req, res) => {
      try {
        const { userId } = req.body;
        const user = await User.findOne({_id: userId})
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
                    _id: { $ne: userId },
                },
            },
            {
                $match: {
                    preferences: { $in: user.preferences },
                },
            },
        ]);
        return res.status(200).send(players);
      } catch (e) {
        return res.status(400).send(e.message);
      }
    }

exports.createOne = async (req, res) => {
        try {
            const user = await new User({...req.body}).save();
            res.status(200).send(user)
        } catch (e){
            res.status(400).send(e.message)
        }        
    }

exports.updateOne = async (req, res) => {
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

exports.addPreference = async (req, res) => {
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

exports.deleteOne = async (req, res) => {
      try {
        await User.deleteOne({ _id: req.params.userId });
        res.sendStatus(200);
      } catch(e) {
        res.status(400).send(e.message);
      }
    }

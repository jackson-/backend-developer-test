const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
  username: String,
  googleId: { type: String, unique: true },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    }
  },
  games: [{ type: Schema.Types.ObjectId, ref: 'Games' }],
  age: Number,
  isHost: Boolean
})
usersSchema.index({ location: '2dsphere' })
const Users = mongoose.model('Users', usersSchema)

async function findInterestedUsersForGame (userId, userLocation, gameId) {
  console.log(userId, userLocation, gameId)
  return Users.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: userLocation
        },
        spherical: true,
        distanceField: 'distanceFromUser'
      }
    },
    {
      $match: {
        $and: [
          { _id: { $ne: mongoose.Types.ObjectId(userId) } },
          { games: mongoose.Types.ObjectId(gameId) }
        ]
      }
    }
  ]).exec()
}
module.exports = Users
module.exports.findInterestedUsersForGame = findInterestedUsersForGame

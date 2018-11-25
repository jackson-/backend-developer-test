const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  googleId: String,
  password: String,
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    }
  },
  games: [{ type: Schema.Types.ObjectId, ref: 'Games' }]
})

module.exports = mongoose.model('Users', usersSchema)

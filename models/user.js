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

const 
module.exports = mongoose.model('Users', usersSchema)

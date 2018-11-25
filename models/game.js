const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('config')
const connectionString = config.get('connection_string')
mongoose.connect(connectionString, { useNewUrlParser: true })

const gameSchema = new Schema({
  title: { type: String, unique: true, required: true },
  description: String,
  min_players: { type: Number, required: true },
  max_players: { type: Number, required: true }
})
const Games = mongoose.model('Games', gameSchema)
module.exports = Games

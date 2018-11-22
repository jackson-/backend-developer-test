const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('config')
const connectionString = config.get('connection_string')
mongoose.connect(connectionString, { useNewUrlParser: true })

const gameSchema = new Schema({
  title: String,
  description: String,
  min_players: Number,
  max_player: Number,
  date: { type: Date, default: Date.now }
})
const Games = mongoose.model('Games', gameSchema)
module.exports = Games

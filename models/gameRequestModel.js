const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('config')
const connectionString = config.get('mongo_connection_string')
mongoose.connect(connectionString, { useNewUrlParser: true })

const gameRequestSchema = new Schema({
  sourceUser: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  targetUser: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  game: { type: Schema.Types.ObjectId, ref: 'Games', required: true },
  created: { type: Date, default: Date.now() }
})
const Games = mongoose.model('GameRequests', gameRequestSchema)
module.exports = Games

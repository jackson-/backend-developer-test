let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: {
        type:String,
        required: [true, 'name required'],
    }
    min_players: {
        type: Number,
        required: [true, 'minimum players required'],
    },
    max_players: {
        type: Number,
        required: [true, 'maximum players required'],
    },
},{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Game', gameSchema);
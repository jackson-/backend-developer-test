let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const gamePreferenceSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'userId required'],
    }
    gameId: {
        type: Schema.Types.ObjectId,
        required: [true, 'gameId required'],
    },
},{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('GamePreference', gamePreferenceSchema);
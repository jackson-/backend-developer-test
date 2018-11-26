let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const matchSchema = new Schema({
    gameId: {
        type: Schema.Types.ObjectId,
        required: [true, 'gameId required'],
    },
    startedAt: {
        type: Date,
        default: null,
    },
    endedAt: {
        type: Date,
        default: null,
    },
},{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Match', matchSchema);
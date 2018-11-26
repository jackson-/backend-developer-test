let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const matchSchema = new Schema({
    game: { type: Schema.Types.ObjectId, ref: 'Game'},
    startedAt: {
        type: Date,
        default: null,
    },
    endedAt: {
        type: Date,
        default: null,
    },
    open: {
        type: Boolean,
        default: true,
    },
    host: { type: Schema.Types.ObjectId, ref: 'User'},
    players: [{ type: Schema.Types.ObjectId, ref: 'User'}]
},{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Match', matchSchema);
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const matchPlayerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'userId required'],
    }
    matchId: {
        type: Schema.Types.ObjectId,
        required: [true, 'matchId required'],
    },
    host: {
        type: Boolean,
        required: [true, 'host status required']
    }
},{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('MatchPlayer', matchPlayerSchema);
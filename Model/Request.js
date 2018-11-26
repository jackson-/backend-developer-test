let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const requestSchema = new Schema({
    match: { type: Schema.Types.ObjectId, ref: 'Match'},
    answer: {
        type: Boolean,
        default: null,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User'},
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updatedAt' } });

module.exports = mongoose.model('Request', requestSchema);
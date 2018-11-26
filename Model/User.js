const mongoose = require('mongoose');
const uniqueArrayPlugin = require('mongoose-unique-array');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type:String,
        required: [true, 'name required'],
    },
    email: {
        type: String,
        required: [true, 'email required'],
        unique: [true, 'email already registered']
    },
    googleId: {
        type: String,
        default: null,
        unique: [true, 'Google ID already registered']
    },
    location: {
        type:String,
    },
    age: {
        type:Number,
    },
    available: {
        type:Boolean,
        required: [true, 'availability required'],
        default: false
    },
    preferences: [{ type: Schema.Types.ObjectId, ref: 'Game', unique: true}]
},{ timestamps: { createdAt: 'created_at' } });

userSchema.plugin(uniqueArrayPlugin);

module.exports = mongoose.model('User', userSchema);
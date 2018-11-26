let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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
},{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('User', userSchema);
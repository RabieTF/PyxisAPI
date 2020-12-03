const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: true
    }
});



module.exports = mongoose.model('user', User);
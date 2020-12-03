const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    fullname: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    read: {
        type: Boolean,
        default: false
    }
});

var Messages = mongoose.model('Message', messageSchema);

module.exports = Messages;
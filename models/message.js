const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    }, 
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
        required: true
    }
});

var Messages = mongoose.model('Message', messageSchema);

module.exports = Messages;
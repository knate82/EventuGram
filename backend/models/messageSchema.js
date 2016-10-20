'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    message: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        recipient: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        readByRecipient: {
            type: Boolean,
            default: false
        },
        text: String
    }, {timestamps: true}]
}, {timestamps: true});

module.exports = mongoose.model('Message', messageSchema);
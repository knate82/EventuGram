'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postImage: {
        type: String,
        required: true
    },
    caption: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    hashtags: [String],
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: String
    }]
}, {timestamps: true});

postSchema.methods.withoutProps = function () {
    var post = this.toObject();

    for (var i = 0; i < arguments.length; i++) {
        delete post.user[arguments[i]];
    }
    return post;
};

module.exports = mongoose.model('Post', postSchema);
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    postImage: {
        data: Buffer,
        contentType: String
    },
    caption: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    hashtags: [String],
    comments: [{
        user: Schema.Types.ObjectId,
        ref: 'User',
        comment: String
    }]
}, {timestamps: true});

postSchema.methods.blobToBase64Post = function() {
    var postObj = this;
    postObj.postImage = postObj.postImage = 'data:' + postObj.postImage.contentType + ';base64,' + postObj.profileImage.data.toString('base64');
    return postObj;
};

module.exports = mongoose.model('Post', postSchema);
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    userDisplayName: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    profileImage: {
        data: Buffer,
        contentType: String
    },
    bio: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {timestamps: true});

userSchema.pre('save', function (next) {
    this.userDisplayName = this.username;
    this.username = this.userDisplayName.toLowerCase();
    next();
});

userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password'))
        return next();

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return console.log(err);
        user.password = hash;
        next();
    });
});

userSchema.methods.comparePasswords = function (passwordAttempt, callback) {
    var user = this;
    bcrypt.compare(passwordAttempt, user.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

userSchema.methods.withoutPassword = function () {
    var user = this.toObject();
    delete user.password;
    return user;
};

userSchema.methods.blobToBase64Prof = function() {
    var userObj = this;
    userObj.profileImage = 'data:' + userObj.contentType + ';base64,' + userObj.data.toString('base64');
    return userObj;
};

module.exports = mongoose.model('User', userSchema);
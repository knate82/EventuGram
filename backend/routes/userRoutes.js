'use strict';

// NODE MODULES
var express = require('express');
var userRoute = express.Router();
var multipart = require('connect-multiparty');
var multipartyMiddleWare = multipart();
var fs = require('fs');

// SCHEMA
var User = require('../models/userSchema');

userRoute.route('/profile')
    .get(function(req, res) {
        var user = req.user._id;
        User.findById(user)
            .populate('posts')
            .exec(function(err, user) {
            if (err) return res.status(500).send(err);
                user.posts.forEach(function(post) {
                    post = post.blobToBase64Prof();
                });
            res.send(user.blobToBase64Prof());
        });
    })
    .put(function (req, res) {
        var user = req.user._id;
        var update = req.body;
        User.findByIdAndUpdate(user, update, {new: true}, function (err, updatedUser) {
            if (err) return res.status(500).send(err);
            res.send(updatedUser);
        });
    });

userRoute.route('/upload/profileimage')
    .post(function (req, res) {
        var user = req.user._id;
        User.find(user, function (err, foundUser) {
            if (err) res.status(500).send(err);

            foundUser.profileImage.data = fs.readFileSync(req.files.file.path);
            foundUser.profileImage.contentType = req.files.file.type;
            foundUser.save(function (err) {
                if (err) throw err;
                console.error('saved img to mongo');
            });
        });
    });

module.exports = userRoute;
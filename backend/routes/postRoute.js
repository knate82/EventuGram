'use strict';

// NODE MODULES
var express = require('express');
var postRoute = express.Router();
var multipart = require('connect-multiparty');
var multipartyMiddleWare = multipart();
var fs = require('fs');

// SCHEMA
var User = require('../models/userSchema');
var Post = require('../models/postSchema');

postRoute.route('/post')
    .post(function (req, res) {
        var newPost = new Post(req.body);

        newPost.user = req.user;
        newPost.postImage.data = fs.readFileSync(req.files.file.path);
        newPost.postImage.contentType = req.files.file.type;
        newPost.save(function (err, newPost) {
            if (err) return res.status(500).send(err);
            User.findById(user, function (err, foundUser) {
                foundUser.posts.push(newPost);
                foundUser.save(function (err) {
                    if (err) {
                        throw err;
                    }
                });
            });
        });
    });

postRoute.route('/post/:postId')
    .get(function (req, res) {
        var post = req.params.postId;
        Post.findById(post)
            .populate('user')
            .exec(function (err, post) {
                if (err) res.status(500).send(err);
                res.send(post.blobToBase64Post());
            });
    });

postRoute.route('/post/friends')
    .get(function (req, res) {
        var user = req.user._id;
        User.findById(user)
            .populate('friends', 'posts')
            .exec(function(err, posts) {
                if (err) return res.status(500).send(err);
                posts.forEach(function(post) {
                    post = post.blobToBase64Post();
                });
                res.send(posts);
            })
    });

module.exports = postRoute;
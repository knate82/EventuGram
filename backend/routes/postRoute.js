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

postRoute.use('*', multipartyMiddleWare);

postRoute.route('/newPost')
    .get(function (req, res) {
        Post.find(req.query, function (err, posts) {
            if (err) return res.status(500).send(err);

            res.send(posts);
        })
    })
    .post(function (req, res) {
        var newPost = new Post(req.body);

        newPost.user = req.user;
        var data = fs.readFileSync(req.files.file.path);
        var contentType = req.files.file.type;

        newPost.postImage = 'data:' + contentType + ';base64,' + data.toString('base64');

        newPost.save(function (err, newPost) {
            if (err) return res.status(500).send(err);
            User.findById(req.user._id, function (err, foundUser) {
                foundUser.posts.push(newPost);
                foundUser.save(function (err) {
                    if (err) {
                        throw err;
                    }
                });
            });
        });
    });

postRoute.route('/posts/:postId')
    .get(function (req, res) {
        var post = req.params.postId;
        Post.findById(post)
            .populate('user')
            .exec(function (err, post) {
                if (err) res.status(500).send(err);

                res.send(post.withoutProps('password'));
            });
    })
    .put(function (req, res) {
        var post = req.params.postId;
        req.body.user = req.user;
        Post.findById(post, function (err, post) {
            if (err) return res.status(500).send(err);

            post.comments.push(req.body);
            post.save(function (err, savedComment) {
                if (err) return res.status(500).send(err);

                res.send(savedComment.comments[savedComment.comments.length - 1].comment);
            })

        })
    });

postRoute.route('/friends')
    .get(function (req, res) {
        var user = req.user._id;
        User.findById(user, function (err, foundUser) {
            if (err) return res.status(500).send(err);
            if (foundUser.following.length) {
                Post.find({user: {$in: [foundUser.following, user]}})
                    .sort({'createdAt': -1})
                    .populate({
                        path: 'user',
                        select: 'username profileImageRaw'
                    })
                    .populate({
                        path: 'comments.user',
                        model: 'User',
                        select: 'username'
                    })
                    .exec(function (err, posts) {
                        if (err) return res.status(500).send(err);
                        res.send(posts);
                    })
            }
        })
    });

module.exports = postRoute;
'use strict';

// NODE MODULES
var express = require('express');
var userRoute = express.Router();
var multipart = require('connect-multiparty');
var multipartyMiddleWare = multipart();
var fs = require('fs');

// SCHEMA
var User = require('../models/userSchema');
var Image = require('../models/imageSchema');

userRoute.use('*', multipartyMiddleWare);

userRoute.route('/getAll')
    .get(function (req, res) {
        User.find({username: {$in: [new RegExp('^' + req.query.username)]}}, function (err, users) {
            if (err) return res.status(500).send(err);

            res.send(users);
        });
    });

userRoute.route('/profile')
    .get(function (req, res) {
        User.findById(req.user)
            .populate('posts')
            .exec(function (err, user) {
                res.send(user.withoutProps('password', 'profileImageRaw'));
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

userRoute.route('/profileimage/change')
    .post(function (req, res) {
        var user = req.user._id;

        User.findById(user, function (err, foundUser) {
            if (err) res.status(500).send(err);

            var data = fs.readFileSync(req.files.file.path);
            var contentType = req.files.file.type;

            Image.findOne({user: user}, function (err, foundImage) {
                if (err) return res.status(500).send(err);

                if (foundImage) {
                    foundImage.remove(function (err) {
                        if (err) throw err;
                    });
                }

                var newImg = {};
                newImg.profileImage = 'data:' + contentType + ';base64,' + data.toString('base64');
                newImg.user = req.user;
                var profileImage = new Image(newImg);

                profileImage.save(function (err) {
                    if (err) return res.status(500).send(err)
                });

                foundUser.profileImage = '/profileimage/get/' + foundUser._id;
                foundUser.profileImageRaw = 'data:' + contentType + ';base64,' + data.toString('base64');
                ;
                foundUser.save(function (err) {
                    if (err) throw err;
                    console.error('saved img to mongo');
                });
            });
        });
    });

userRoute.route('/profileimage/get/:id')
    .get(function (req, res) {
        var userId = req.params.id;

        Image.findOne({user: userId}, function (err, image) {
            if (err) return res.status(500).send(err);
            res.send(image);
        });
    });

userRoute.route('/:id')
    .get(function (req, res) {
        if (req.params.id === undefined)
            return res.send({message: 'id is undefined'});

        User.findById(req.params.id, function (err, user) {
            if (err) return res.status(500).send(err);

            if (user)
                res.send(user.withoutProps('password', 'email'));
        });
    });

userRoute.route('/friend/:id')
    .get(function (req, res) {
        User.findById(req.user, function (err, user) {
            if (err) return res.status(500).send(err);

            if (user.following.length) {
                if (user.following.indexOf(req.params.id) >= 0) {
                    return res.send(user.following[req.params.id])
                }
            }
            res.send({message: 'not found'});
        })
    });

userRoute.route('/friend/add/:userId')
    .patch(function (req, res) {
        User.findById(req.user, function (err, user) {
            if (err) return res.status(500).send(err);

            if (user.following.indexOf(req.params.userId) >= 0) {
                user.following.remove(req.params.userId);

                User.findById(req.params.userId, function (err, foundUser) {
                    foundUser.followers.remove(user._id);
                    foundUser.save();
                });

                user.save();
                return res.send({message: 'unfollowed user', code: 1});
            } else {
                user.following.push(req.params.userId);

                User.findById(req.params.userId, function (err, foundUser) {
                    foundUser.followers.push(user);
                    foundUser.save();
                });
                user.save();
                return res.send({message: 'followed user', code: 0});
            }
        })
    });

module.exports = userRoute;
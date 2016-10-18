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

userRoute.route('/profile')
    .get(function (req, res) {
        User.findById(req.user)
            .populate('posts')
            .exec(function (err, user) {
                res.send(user.withoutPassword());
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
                if (err) res.status(500).send(err);

                if (foundImage) {
                    foundImage.remove(function (err) {
                        if (err) res.status(500).send(err);
                    });
                }

                var newImg = {};
                newImg.profileImage = 'data:' + contentType + ';base64,' + data.toString('base64');
                newImg.user = req.user;
                var profileImage = new Image(newImg);

                profileImage.save(function (err) {
                    if (err) res.status(500).send(err)
                });

                foundUser.profileImage = '/profileimage/get/' + foundUser._id;
                foundUser.save(function (err) {
                    if (err) throw err;
                    console.error('saved img to mongo');
                });
            });
        });
    })
;

userRoute.route('/profileimage/get/:id')
    .get(function (req, res) {
        var userId = req.params.id;

        Image.findOne({user: userId}, function (err, image) {
            if (err) res.status(500).send(err);
            res.send(image);
        });
    });

module.exports = userRoute;
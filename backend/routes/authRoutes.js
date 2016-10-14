'use strict';

// NODE MODULES
var express = require('express');
var authRoute = express.Router();
var jwt = require('jsonwebtoken');

var config = require('../config');

// SCHEMAS
var User = require('../models/userSchema');

authRoute.route('/signup')
    .post(function (req, res) {
        User.findOne({username: req.body.username.toLowerCase()}, function (err, existingUser) {
            if (err) return res.status(500).send(err);

            if (existingUser) {
                res.send({
                    success: false,
                    message: 'This username is not available'
                })
            } else if (!existingUser) {
                var newUser = new User(req.body);

                newUser.save(function (err, savedUser) {
                    if (err) return res.status(500).send(err);
                    res.send(savedUser);
                })
            }
        })
    });

authRoute.route('/login')
    .post(function (req, res) {
        User.findOne({username: req.body.username.toLowerCase()}, function (err, user) {
            if (err) return res.status(500).send(err);
            if (!user) {
                res.send({
                    success: false,
                    message: 'This user does not exist'
                })
            } else if (user) {
                user.comparePasswords(req.body.password, function(err, isMatch) {
                    if (err) return res.status(500).send(err);
                    if (!isMatch) {
                        res.send({
                            success: false,
                            message: 'The password entered is incorrect'
                        })
                    } else if (isMatch) {
                        var token = jwt.sign(user, config.secret, {expiresIn: '24h'});

                        res.send({
                            success: true,
                            user: user.withoutPassword(),
                            token: token,
                            message: 'Token granted'
                        })
                    }
                })
            }
        })
    });

module.exports = authRoute;

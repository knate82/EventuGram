'use strict';

var express = require('express');
var messageRoute = express.Router();

// MODELS
var Message = require('../models/messageSchema');
var Conversation = require('../models/conversationSchema');

messageRoute.route('/')
    .get(function (req, res) {
        var user = req.user._id;
        var recipient = req.body.recipient;

        Conversation.find({users: {$in: [user, recipient]}})
            .populate('users')
            .populate('messages')
            .exec(function (err, conversation) {
                if (err) return res.status(500).send(err);

                res.send(conversation);
            })
    })
    .post(function (req, res) {
        var newMessage = new Message(req.body);
        newMessage.user = req.user;

        newMessage.save();

        if (err) return res.status(500).send(err);

        Conversation.findOne({users: {$in: [newMessage.user, newMessage.recipient]}}, function (err, conversation) {
            if (err) return res.status(500).send(err);

            if (!conversation) {
                var conversationObj = {};
                conversationObj.users = [newMessage.user._id, newMessage._id];
                var newConversation = new Conversation(conversationObj);
                newConversation.messages.push(newMessage.text);
                newConversation.save();
            } else if (conversation) {
                conversation.messages.push(newMessage);
                conversation.save();
            }
        });
        res.send(newMessage);
    });

module.exports = messageRoute;

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

        newMessage.message.user = req.user._id;
        newMessage.save();

        Conversation.findOne({$or: [{users: [newMessage.message.user, newMessage.message.recipient]}, {users: [newMessage.message.recipient, newMessage.message.user]}]}, function (err, conversation) {
            if (err) return res.status(500).send(err);
            console.log(conversation.users);
            if (!conversation) {
                var conversationObj = {};
                conversationObj.users = [newMessage.message.user, newMessage.message.recipient];
                var newConversation = new Conversation(conversationObj);
                newConversation.messages.push(newMessage);
                newConversation.save();
                return res.send(newConversation);
            } else if (conversation) {
                conversation.messages.push(newMessage);
                conversation.save();
            }
            res.send(conversation);
        });
    });

messageRoute.route('/conversations/:id')
    .get(function (req, res) {

        Conversation.findById(req.params.id)
            .populate('users', 'username profileImageRaw')
            .populate({
                path: 'messages',
                model: 'Message',
                populate: {
                    path: 'message.user message.recipient',
                    select: 'username profileImageRaw'
                }
            })
            .exec(function (err, conversation) {
                if (err) return res.status(500).send(err);

                res.send(conversation);
            })
    });

messageRoute.route('/conversations')
    .get(function (req, res) {
        Conversation.find({users: {$in: [req.user._id]}})
            .populate('users', 'username profileImageRaw')
            .populate('messages')
            .exec(function (err, conversations) {
                if (err) return res.status(500).send(err);

                res.send(conversations);
            })
    });

module.exports = messageRoute;

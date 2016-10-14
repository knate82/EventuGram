'use strict';

// REQUIRE NODE MODULES
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');


// REQUIRE FILES
var config = require('./config');

// SERVER
var app = express();
var port = process.env.PORT || 8080;

// MIDDLEWARE
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(config.secret, function () {
    console.log('Connected to mongodb');
});

app.listen(port, function () {
    console.log('Server is listening on port', port + '...');
});
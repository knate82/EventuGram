'use strict';

// REQUIRE NODE MODULES
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var expressJwt = require('express-jwt');
var multipart = require('connect-multiparty');
var multipartyMiddleWare = multipart();

// REQUIRE FILES
var config = require('./config');
var authRoutes = require('./routes/authRoutes');
var postRoutes = require('./routes/postRoute');
var userRoutes = require('./routes/userRoutes');

// SERVER
var app = express();
var port = process.env.PORT || 8082;

// MIDDLEWARE
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', expressJwt({secret: config.secret}));
app.use('/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


mongoose.connect(config.database, function () {
    console.log('Connected to mongodb');
});

app.listen(port, function () {
    console.log('Server is listening on port', port + '...');
});
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').config();

var userRouter = require('./routes/userRouter');
var messageRouter = require('./routes/messageRouter');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_ACCESS , { useNewUrlParser: true, useUnifiedTopology: true })
.then((db) => {
    console.log('Database connected.');
})



var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/message', messageRouter);

module.exports = app;

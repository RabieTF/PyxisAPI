const express = require('express');
const bodyParser = require('body-parser');

const messageRouter = express.Router();
const Messages = require('../models/message');

messageRouter.use(bodyParser.json());

messageRouter.route('/')
.get((res, req, next) => {
    
})

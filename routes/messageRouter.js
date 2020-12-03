const express = require('express');
const bodyParser = require('body-parser');
const authenticateToken = require('../middlewares/authenticate');

const messageRouter = express.Router();
const Message = require('../models/message');

messageRouter.use(bodyParser.json());

messageRouter.get('/', authenticateToken, (req, res) => {
    Message.find({}, (err, msgs) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(msgs);
    })
});

messageRouter.post('/read', authenticateToken, async (req, res) => {
    try {
        var message = await Message.findOne({"email": req.body.email, "content": req.body.content});
        message.read = true;
        await message.save();
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

messageRouter.post('/send', async (req, res) => {
    try {
        var msg = new Message(req.body);
        var result = await msg.save();
        res.status(200).send({"email": result.email, "fullname": result.fullname, "content": result.content});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = messageRouter;
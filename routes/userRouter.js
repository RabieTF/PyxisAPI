require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middlewares/authenticate');

const userRouter = express.Router();


userRouter.get('/', authenticateToken, async (req,res) => {  //Only an admin can check the list of the users
    if (!req.user.admin) return res.status(403);
    User.find({}, (err, users) => {
        if (err) return res.status(500);
        res.status(200).send(users);
    })
});

userRouter.get('/islogged', authenticateToken, (req,res) => {
    if (!req.user) return res.status(200).send({"isLoggedIn": false});
    return res.status(200).send({"isLoggedIn": true, "isAdmin": req.user.admin});
});

userRouter.post('/create', authenticateToken, async (req,res) => {  //Only an administrator can create a new account, we check whether 
    if (!req.user.admin) return res.status(403);                     //the requester is admin or no then we create a new account
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        var user = new User(req.body);
        var result = await user.save();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        var user = await User.findOne({username: req.body.username})
        if (!user) {
            return res.status(400).send({message: "The user doesn't exist"});
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({message: "The password is invalid!"});
        }
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"});
        res.json({accessToken: accessToken});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})




module.exports = userRouter;

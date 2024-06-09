const express = require('express');
const User = require('../db/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const user = new User({ email, password });
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    try {
       await user.save();
         const token = await jwt.sign({ email: user.email, id: user._id}, process.env.JWT_SECRET);
         return res.json({
            jwt: token,
         })
    } catch (error) {
        console.log(error);
    }
})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).josn({messgae: 'Email and Password are required'});
    }
    try {
        const user = await User.findOne({
            email,
            password,
        });
        if(!user) {
            return res.status(400).json({message: 'Invalid Credentials'});
        }
        console.log(user);
        const token = await jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET);
        return res.json({
            jwt: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});   

module.exports = userRouter;
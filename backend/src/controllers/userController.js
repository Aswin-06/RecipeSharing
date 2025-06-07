const {putData,getData}=require("../repository/userRepo");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();
const secret=process.env.secret;

exports.register=async (req,res) => {
    if(!req||!req.body)
        return res.status(404).send("body not found");
    const {username,password}=req.body;
    const exist=await getData(username);
    if(exist)
        return res.status(404).send("user already found");
    const hashpass=await bcrypt.hash(password,12);
    putData({username:username,password:hashpass});
    return res.status(200).send("register successful");
}

exports.login=async (req,res) => {
    if(!req||!req.body)
        return res.status(404).send("body not found");
    const {username,password}=req.body;
    const exist=await getData(username);
    if(!exist)
        return res.status(404).send("user not found");

    if(!await bcrypt.compare(password,exist.password))
        return res.status(404).send("wrong password");

    const token=jwt.sign({username},secret,{expiresIn:"2h"});
    return res.status(200).json({id:exist.id,token:token});
}

exports.authenticate=async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);
    jwt.verify(token,secret,(err,user)=>{
        if (err) 
            return res.sendStatus(403);
        req.username = user;
        next();
    })
}
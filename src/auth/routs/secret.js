'use strict';
const express = require('express');
const secretRouters=express.Router();
const bearer =require('../middlewares/bearer');

secretRouters.get('/secretstuff',bearer,(req,res)=>{
    res.status(200).json({
        'message': 'You are authorized to the secret stuff',
        'user': req.user
    });})
module.exports=secretRouters;
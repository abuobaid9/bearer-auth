'use strict';
const express = require('express');
const basic =require('../middlewares/basic');
const signInRouter = express.Router();
signInRouter.post('/signin',basic, async (req, res) => {
  res.status(200).json(req.user);
});
module.exports = signInRouter;
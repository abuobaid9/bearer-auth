const express = require('express');
const bcrypt = require('bcrypt');
const { users } = require('../models/index');
const signUpRouter = express.Router();
signUpRouter.post('/signup', async (req, res) => {

  try {
    let username = req.body.username;
    let password = await bcrypt.hash(req.body.password, 10);

    const record = await users.create({
      username: username,
      password: password,
    });
    res.status(201).json(record);
  } catch (e) {
    console.log(e.message);
  }
})


  module.exports = signUpRouter;
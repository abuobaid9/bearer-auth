'use strict';
require("dotenv").config();
// const {sequelize,DataTypes}=require("./index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.API_SECRET || "any word";
const { sequelize, DataTypes } = require("./index");


const users = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.VIRTUAL,
    get() {
      return jwt.sign({ username: this.username }, SECRET);
    }
  }
});
// users.beforeCreate(async (user) => {
//   let hashedPass = bcrypt.hash(user.password, 10);
//   user.password = hashedPass;
// });

users.authenticateBasic = async function (username, password) {
  const user = await users.findOne({ where: { username: username } });
  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    let newToken = jwt.sign({ username: user.username }, SECRET, { expiresIn: '15m' });
    user.token = newToken;
    return user;
  }
  else {
    throw new Error('Invalid User');
  }
}
users.authenticateToken = async function (token) {
  try {
    const parsedToken = jwt.verify(token, SECRET);
    const user = this.findOne({where:{ username: parsedToken.username }})
    if (user) { return user; }
    throw new Error("User Not Found");
  } catch (e) {
    throw new Error(e.message)
  }
}


module.exports = users;
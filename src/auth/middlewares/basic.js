
'use strict';
const {users} = require("../models/user");
const base64 = require('base-64');


async function basicAuth(req, res, next) {
  if (req.headers.authorization) {
    let basicHeaderParts = req.headers.authorization.split(" ");
    let encodedValue = basicHeaderParts.pop();
    let decodedValue = base64.decode(encodedValue);

    let [username, password] = decodedValue.split(":");
    users.authenticateBasic(username, password)
        .then((validUser) => {
            req.user = validUser;
            // console.log('/////////////////////////', req.user)
            next();
        })
        .catch((e) => {
            console.error(e);
            res.status(403).send('Invalid Login');
        })
}

}
module.exports = basicAuth;
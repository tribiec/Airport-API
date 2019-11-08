const jwt = require('jsonwebtoken');
const createToken = (user, callback) => {
     jwt.sign(user, 'aeropuert_jeje', { expiresIn: '5m' }, callback);
}
const checkToken = (token,callback) => {
  jwt.verify(token, 'aeropuert_jeje', callback);
}
module.exports = { createToken, checkToken };
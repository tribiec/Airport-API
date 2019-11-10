import jwt from 'jsonwebtoken';

const createToken = (user, callback) => {
     jwt.sign(user, 'aeropuert_jeje', { expiresIn: '5m' }, callback);
}

const verifyToken = (token,callback) => {
  jwt.verify(token, 'aeropuert_jeje', callback);
}

export { createToken, verifyToken };
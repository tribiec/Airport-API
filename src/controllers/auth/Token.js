import jwt from 'jsonwebtoken';

const createToken = (user, callback) => {
     jwt.sign(user, 'aeropuert_jeje', { expiresIn: '10m' }, callback);
}

const verifyToken = (token,callback) => {
  jwt.verify(token, 'aeropuert_jeje', callback);
}

export { createToken, verifyToken };
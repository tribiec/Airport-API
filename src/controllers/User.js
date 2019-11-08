const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { checkToken } = require('./auth/Token');

router.post('/check', verifyToken, (req, res) => {
  checkToken(req.token,(err, authData) => {
    if (err) {
      res.status(401).json({
        status: 401,
        message: "Token Invalid"
      });
    } else {
      res.json({
        message: authData,
        status: 200
      }).status(200);
    }
  })
});

router.post('/login', (req, res) => {
  const {checkUser} = require('./auth/Login');
  checkUser({correo: req.body.correo, clave: req.body.clave},res); 
});

module.exports = router;
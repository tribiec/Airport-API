const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/vuelos', (req, res) => {
    res.send('vuelos desde admin...');
})

module.exports = router;
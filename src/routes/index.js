const express = require('express');
const router = express.Router();
router.use('/user', require('../controladores/User'));
router.use('/aeropuertos', require('../controladores/Aeropuertos'));
router.use('/admin', require('../controladores/Admin'));
router.use('/*', (req, res) => {
    res.sendStatus(400);
});

module.exports = router; 
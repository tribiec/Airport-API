const express = require('express');
const router = express.Router();
router.use('/user', require('../controllers/User'));
router.use('/aeropuertos', require('../controllers/Aeropuertos'));
router.use('/agencias', require('../controllers/Agencias'));
router.use('/admin', require('../controllers/Admin'));
router.use('/*', (req, res) => {
    res.sendStatus(400);
});

module.exports = router; 
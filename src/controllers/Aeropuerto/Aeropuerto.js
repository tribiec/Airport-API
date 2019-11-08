const express = require('express');
const router = express.Router();

router.use('/agencias', require('./Agencias/Agencias'));

router.use('/vuelos', require('./Vuelos/Vuelos'));

router.get('/', async (req, res) => {
        const airports = req.query;
        res.json({status: 200, message: { ...airports[0] }}).status(200);
});

module.exports = router;
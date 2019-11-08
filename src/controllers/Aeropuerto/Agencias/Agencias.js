const express = require('express');
const router = express.Router();
const Agencia = require('../../../models/Agencia');

router.get('/', async (req, res) => {
    const agencias = await Agencia({solicitud: 'Agencias_aero', params: [req.aeropuerto]});
    if (agencias.length >= 1) {
        res.json({ status: 200, message: [...agencias] }).status(200);
    } else {
        res.json({ status: 404, message: "No se encontraron agencias..." }).status(404);
    }
});

module.exports = router;
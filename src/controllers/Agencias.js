const express = require('express');
const router = express.Router();
const Agencia = require('../models/Agencia');

router.get('/', async (req, res) => {
    const agencias = await Agencia({solicitud: 'Agencias'});
    if (agencias.length >= 1) {
        res.json({ status: 200, message: [...agencias] }).status(200);
    } else {
        res.json({ status: 404, message: "No se encontraron agencias..." }).status(404);
    }
});

router.get('/:id', async (req, res) => {
    if (!isNaN(req.params.id)) {
        const agencia = await Agencia({solicitud: 'Agencia', params: [req.params.id]});
        if (agencia.length === 1) {
            const vuelos = await Agencia({solicitud: 'Vuelos', params: [req.params.id]});
            res.json({ status: 200, message: { vuelos, ...agencia[0] } }).status(200);
        } else {
            res.json({ status: 404, message: "No se encontraron agencias..." }).status(404);
        }
    }else{
            res.json({ status: 400, message: "Id de agencia invalido..."}).status(400);
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Vuelos = require('../../../models/Vuelos');
const date = new Date(Date.now());

const tiempo = {
    minutos: date.getMinutes(),
    hora: date.getHours(),
    dia: date.getDate(),
    mes: date.getMonth(),
    year: date.getFullYear()
};

router.get('/', async (req, res) => {
    const vuelos = await Vuelos({solicitud: 'todos', params: [req.aeropuerto,req.aeropuerto,(tiempo.mes+1),tiempo.dia,tiempo.year]});
    const llegadas = vuelos.filter(vuelo => (vuelo.destino_id === req.aeropuerto));
    const salidas = vuelos.filter(vuelo => (vuelo.origen_id === req.aeropuerto));
    res.json({ status: 200, message: { llegadas: [...llegadas], salidas: [...salidas] } }).status(200);
});

router.get('/actual', async (req, res) => {
    const vuelos = await Vuelos({solicitud: 'actual', params: [req.aeropuerto,req.aeropuerto,(tiempo.mes+1),tiempo.dia,tiempo.year,tiempo.hora,tiempo.minutos]});
    const llegadas = vuelos.filter(vuelo => (vuelo.destino === req.aeropuerto));
    const salidas = vuelos.filter(vuelo => (vuelo.origen === req.aeropuerto));
    res.json({ status: 200, message: { llegadas: [...llegadas], salidas: [...salidas] } }).status(200);
});

module.exports = router;
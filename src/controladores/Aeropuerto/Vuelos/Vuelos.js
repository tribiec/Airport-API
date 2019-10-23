const express = require('express');
const router = express.Router();
const db = require('../../../database/Conexion');
const date = new Date(Date.now());
const tiempo = {
    minutos: date.getMinutes(),
    hora: date.getHours(),
    dia: date.getDate(),
    mes: date.getMonth(),
    year: date.getFullYear()
};

router.get('/', async (req, res) => {
    const vuelos = await db.query(`SELECT v.id_vuelo, r.destino, r.origen, v.date, v.time, v.id_status, v.id_agencia, agencia.nombre as agencia_nombre, aptDestino.nombre as destino_nombre, aptDestino.ciudad as destino_ciudad, aptOrigen.nombre as origen_nombre, aptOrigen.ciudad as origen_ciudad FROM vuelos as v INNER JOIN rutas as r ON v.id_ruta = r.id_ruta INNER JOIN agencias as agencia on v.id_agencia = agencia.id_agencia INNER JOIN aeropuertos as aptDestino ON r.destino = aptDestino.id_aeropuerto INNER JOIN aeropuertos as aptOrigen ON r.origen = aptOrigen.id_aeropuerto WHERE (r.destino = '${req.aeropuerto}' OR r.origen = '${req.aeropuerto}') AND v.date = '${(tiempo.mes + 1)}/${tiempo.dia}/${tiempo.year}' ORDER BY v.time ASC`)
    const llegadas = vuelos.filter(vuelo => (vuelo.destino === req.aeropuerto));
    const salidas = vuelos.filter(vuelo => (vuelo.origen === req.aeropuerto));
    res.json({ status: 200, message: { llegadas: [...llegadas], salidas: [...salidas] } }).status(200);
});

router.get('/actual', async (req, res) => {
    const vuelos = await db.query(`SELECT v.id_vuelo, r.destino, r.origen, v.date, v.time, v.id_status, v.id_agencia, agencia.nombre as agencia_nombre, aptDestino.nombre as destino_nombre, aptDestino.ciudad as destino_ciudad, aptOrigen.nombre as origen_nombre, aptOrigen.ciudad as origen_ciudad FROM vuelos as v INNER JOIN rutas as r ON v.id_ruta = r.id_ruta INNER JOIN agencias as agencia on v.id_agencia = agencia.id_agencia INNER JOIN aeropuertos as aptDestino ON r.destino = aptDestino.id_aeropuerto INNER JOIN aeropuertos as aptOrigen ON r.origen = aptOrigen.id_aeropuerto WHERE (r.destino = '${req.aeropuerto}' OR r.origen = '${req.aeropuerto}') AND v.date = '${(tiempo.mes + 1)}/${tiempo.dia}/${tiempo.year}' AND v.time > '${tiempo.hora}:${tiempo.minutos}' ORDER BY v.time ASC`)
    const llegadas = vuelos.filter(vuelo => (vuelo.destino === req.aeropuerto));
    const salidas = vuelos.filter(vuelo => (vuelo.origen === req.aeropuerto));
    res.json({ status: 200, message: { llegadas: [...llegadas], salidas: [...salidas] } }).status(200);
});

module.exports = router;
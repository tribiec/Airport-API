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
    const vuelos = await db.query(`SELECT v.id_vuelo, v.id_status, airOrigen.nombre AS origen_nombre, airOrigen.id_aeropuerto AS origen_id, airOrigen.ciudad as origen_ciudad, airDestino.nombre AS destino_nombre, airDestino.id_aeropuerto AS destino_id, airDestino.ciudad AS destino_ciudad, aerolinea.nombre AS aerolinea_nombre, v.date, v.time FROM vuelos AS v INNER JOIN rutas as r ON v.id_ruta = r.id_ruta INNER JOIN aeropuertos AS airDestino ON r.destino = airDestino.id_aeropuerto INNER JOIN aeropuertos as airOrigen on r.origen = airOrigen.id_aeropuerto INNER JOIN aerolineas AS aerolinea ON v.id_aerolinea = aerolinea.id_aerolinea WHERE (r.destino = '${req.aeropuerto}' OR r.origen = '${req.aeropuerto}') AND v.date = '${(tiempo.mes + 1)}/${tiempo.dia}/${tiempo.year}' ORDER BY date ASC, time ASC`);
    const llegadas = vuelos.filter(vuelo => (vuelo.destino_id === req.aeropuerto));
    const salidas = vuelos.filter(vuelo => (vuelo.origen_id === req.aeropuerto));
    res.json({ status: 200, message: { llegadas: [...llegadas], salidas: [...salidas] } }).status(200);
});

router.get('/actual', async (req, res) => {
    const vuelos = await db.query(`SELECT v.id_vuelo, v.id_status, airOrigen.nombre AS origen_nombre, airOrigen.id_aeropuerto AS origen_id, airOrigen.ciudad as origen_ciudad, airDestino.nombre AS destino_nombre, airDestino.id_aeropuerto AS destino_id, airDestino.ciudad AS destino_ciudad, aerolinea.nombre AS aerolinea_nombre, v.date, v.time FROM vuelos AS v INNER JOIN rutas as r ON v.id_ruta = r.id_ruta INNER JOIN aeropuertos AS airDestino ON r.destino = airDestino.id_aeropuerto INNER JOIN aeropuertos as airOrigen on r.origen = airOrigen.id_aeropuerto INNER JOIN aerolineas AS aerolinea ON v.id_aerolinea = aerolinea.id_aerolinea WHERE (r.destino = '${req.aeropuerto}' OR r.origen = '${req.aeropuerto}') AND v.date = '${(tiempo.mes + 1)}/${tiempo.dia}/${tiempo.year}' AND v.time > '${tiempo.hora}:${tiempo.minutos}' ORDER BY date ASC, time ASC`)
    const llegadas = vuelos.filter(vuelo => (vuelo.destino === req.aeropuerto));
    const salidas = vuelos.filter(vuelo => (vuelo.origen === req.aeropuerto));
    res.json({ status: 200, message: { llegadas: [...llegadas], salidas: [...salidas] } }).status(200);
});

module.exports = router;
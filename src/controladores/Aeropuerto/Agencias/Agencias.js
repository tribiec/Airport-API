const express = require('express');
const router = express.Router();
const db = require('../../../database/Conexion');

router.get('/', async (req, res) => {
    const agencias = await db.query(`SELECT * FROM agencias WHERE id_aeropuerto = '${req.aeropuerto}'`);
    if (agencias.length >= 1) {
        res.json({ status: 200, message: [...agencias] }).status(200);
    } else {
        res.json({ status: 404, message: "No se encontraron agencias..." }).status(404);
    }
})

router.get('/:id', async (req, res) => {
    if (!isNaN(req.params.id)) {
        const agencias = await db.query(`SELECT * FROM agencias WHERE id_agencia = '${req.params.id}'`);
        if (agencias.length === 1) {
            const vuelos = await db.query(`SELECT V.id_vuelo, airOrigen.id_aeropuerto AS origen_id, airOrigen.nombre AS origen_nombre, airDest.id_aeropuerto AS destino_id, airDest.nombre as destino_nombre, V.date, V.time, v.id_status, aerolineas.id_aerolinea, aerolineas.nombre FROM vuelos_agencias as VA INNER JOIN vuelos AS V ON VA.id_vuelo = V.id_vuelo INNER JOIN rutas AS R ON V.id_ruta = R.id_ruta INNER JOIN aeropuertos AS airDest ON r.destino = airDest.id_aeropuerto INNER JOIN aeropuertos AS airOrigen ON r.origen = airOrigen.id_aeropuerto INNER JOIN aerolineas ON v.id_aerolinea = aerolineas.id_aerolinea WHERE VA.id_agencia = ${req.params.id}`)
            res.json({ status: 200, message: { vuelos, ...agencias[0] } }).status(200);
        } else {
            res.json({ status: 404, message: "No se encontraron agencias..." }).status(404);
        }
    }else{
            res.json({ status: 400, message: "Id de agencia invalido..."}).status(400);
    }
})

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../../../database/Conexion');

router.get('/', async (req, res) => {
        const agencias = await db.query(`SELECT * FROM agencias WHERE id_aeropuerto = '${req.aeropuerto}'`);
        if (agencias.length >= 1) {
            res.json({status:200, message: [...agencias]}).status(200);
        }else{
            res.json({status:404, message: "No se encontraron agencias..."}).status(404);
        }  
})

router.get('/:id', async (req, res) => {
    const agencias = await db.query(`SELECT * FROM agencias WHERE id_agencia = '${req.params.id}'`);
    if (agencias.length === 1) {
        const vuelos = await db.query(`SELECT v.id_vuelo, apt.id_aeropuerto, apt.nombre, apt.ciudad, v.date, v.time FROM vuelos AS v INNER JOIN rutas AS r ON v.id_ruta = r.id_ruta INNER JOIN aeropuertos as apt ON r.destino = apt.id_aeropuerto WHERE v.id_agencia = ${req.params.id} AND r.origen = '${req.aeropuerto}'`)
        res.json({status:200, message: {vuelos, ...agencias[0]}}).status(200);
    }else{
        res.json({status:404, message: "No se encontraron agencias..."}).status(404);
    }  
})

module.exports = router;
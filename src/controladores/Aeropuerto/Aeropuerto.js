const express = require('express');
const router = express.Router();
const db = require('../../database/Conexion')

router.use('/agencias', require('./Agencias/Agencias'));

router.use('/vuelos', require('./Vuelos/Vuelos'));

router.get('/', async (req, res) => {
        const airports = await db.query(`SELECT nombre, latitude, longitude, id_aeropuerto FROM aeropuertos WHERE id_aeropuerto = '${req.aeropuerto}'`);
        res.json({status: 200, message: { ...airports[0] }}).status(200);
})

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../database/Conexion')
const verifyToken = require('../middlewares/verifyToken');
const { checkToken } = require('./token');

router.use('/:aeropuerto', async (req,res,next) => {
    req.aeropuerto = req.params.aeropuerto.toUpperCase();
    const query = await db.query(`SELECT * FROM aeropuertos WHERE id_aeropuerto='${req.aeropuerto}'`)
    if(query.length > 0){
        next();
    }else{
        res.json({status: 404, message: "Aeropuerto no encontrado..."}).status(404);
    }
} , require('./Aeropuerto/Aeropuerto'));

router.get('/', async (req, res) => {
        const airports = await db.query("SELECT nombre, latitude, longitude, id_aeropuerto, ciudad FROM aeropuertos");
        res.json({status: 200, message: [...airports]}).status(200);
})

module.exports = router;
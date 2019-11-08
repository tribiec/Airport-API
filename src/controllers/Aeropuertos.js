const express = require('express');
const router = express.Router();
const Aeropuerto = require('../models/Aeropuerto');

router.get('/', async (req, res) => {
        const airports = await Aeropuerto({solicitud: 'aeropuertos'});
        res.json({status: 200, message: [...airports]}).status(200);
});

router.use('/:aeropuerto', async (req,res,next) => {
    req.aeropuerto = req.params.aeropuerto.toUpperCase();
    const query = await Aeropuerto({solicitud: 'aeropuerto', params: [req.aeropuerto]});
    if(query.length > 0){
        req.query = query;
        next();
    }else{
        res.json({status: 404, message: "Aeropuerto no encontrado..."}).status(404);
    }
} , require('./Aeropuerto/Aeropuerto'));


module.exports = router;
import express from 'express';
import Aeropuertos from '../controllers/aeropuertos';
import Agencias from '../controllers/agencias';
import Vuelos from '../controllers/vuelos';
import checkAeropuerto from '../middlewares/checkAeropuerto'

const router = express.Router();

router.get('/', Aeropuertos.getAeropuertos);
router.get('/:id_aeropuerto/', checkAeropuerto, Aeropuertos.getAeropuerto);
router.get('/:id_aeropuerto/vuelos/', checkAeropuerto, Vuelos.getVuelos_Aeropuerto);
router.get('/:id_aeropuerto/agencias/', checkAeropuerto, Agencias.getAgencias_Aeropuerto);

export default router;
import express from 'express';
import Agencias from '../controllers/agencias';
import Vuelos from '../controllers/vuelos';
import checkAgencia from '../middlewares/checkAgencia';

const router = express.Router();

router.get('/',Agencias.getAgencias);
router.get('/:id_agencia', checkAgencia, Agencias.getAgencia);
router.get('/:id_agencia/vuelos', checkAgencia, Vuelos.getVuelos_Agencia);

export default router;
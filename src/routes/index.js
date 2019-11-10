import express from 'express';
import userRoute from './user.routes';
import adminRoute from './admin.routes';
import aeropuertoRoute from './aeropuerto.routes';
import agenciaRoute from './agencia.routes';

var router = express.Router();

router.use('/user', userRoute);
router.use('/admin', adminRoute);
router.use('/aeropuertos', aeropuertoRoute);
router.use('/agencias', agenciaRoute);
router.get('/*', (req, res) => {
    res.sendStatus(400);
});

export default router;
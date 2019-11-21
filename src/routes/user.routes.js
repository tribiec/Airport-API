import express from 'express';
import searchToken from '../middlewares/searchToken';
import checkPago from '../middlewares/checkPago';
import Users from '../controllers/user';

const router = express.Router();

router.post('/check', searchToken, Users.checkLogin);
router.post('/login', Users.Login);
router.post('/comprar', Users.comprarBoleto);
router.post('/boletos', searchToken, Users.verBoletos);

export default router;

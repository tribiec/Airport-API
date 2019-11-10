import express from 'express';
import searchToken from '../middlewares/searchToken';
import Users from '../controllers/user';

const router = express.Router();

router.post('/check', searchToken, Users.checkLogin);
router.post('/login', Users.Login);

export default router;
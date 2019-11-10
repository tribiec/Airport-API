import express from 'express';
import cors from 'cors';
import router from './routes'
import "core-js/stable";
import "regenerator-runtime/runtime";
//* Settings
const app = express();
const port = 90;
app.set('port', process.env.port || port);
//* Middlewares & Router
app.use(cors());
app.use(express.json());
app.use('/api', router);
//* Run Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
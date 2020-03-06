import {} from 'dotenv/config'
import express from 'express';
import path from 'path';
import cors from 'cors';
import router from './routes'
// import "core-js/stable";
import "regenerator-runtime/runtime";
//* Settings
const app = express();
const port = process.env.PORT || 9000;
//* Middlewares & Router
app.use(express.static(path.resolve(__dirname,'client','build')))
app.use(cors());
app.use(express.json());
//* API Aeropuerto
app.use('/api', router);
//* Aeropuerto Front
app.get('/*', (req,res) => {
    res.send("<h1>Aeropuerto API</h1>");
});
//* Run Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
import aeropuertoModelo from '../models/aeropuerto';

class Aeropuertos {

    static async getAeropuertos(req, res){
        const aeropuertos = await aeropuertoModelo({ solicitud: 'aeropuertos' });
        res.json({ status: 200, message: [...aeropuertos] }).status(200);
    }

    static async getAeropuerto(req, res){
        res.json({status: 200, message: { ...req.aeropuerto[0] }}).status(200);
    }

}

export default Aeropuertos;
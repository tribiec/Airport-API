import AeropuertoModelo from '../models/aeropuerto';

const checkAeropuerto = async (req,res,next) => {
    const id_aeropuerto = req.params.id_aeropuerto.toUpperCase();
    const aeropuerto = await AeropuertoModelo({solicitud: 'aeropuerto', params: [id_aeropuerto]});
    if(aeropuerto.length > 0){
        req.id_aeropuerto = id_aeropuerto;
        req.aeropuerto = aeropuerto;
        next();
    }else{
        res.json({status: 404, message: "Aeropuerto no encontrado..."}).status(404);
    }
};

export default checkAeropuerto;
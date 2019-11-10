import AgenciaModelo from '../models/Agencia';

const checkAgencia = async (req,res,next) => {
    const id_agencia = req.params.id_agencia.toUpperCase();
    const agencia = await AgenciaModelo({solicitud: 'Agencia', params: [id_agencia]});
    if(agencia.length > 0){
        req.id_agencia = id_agencia;
        req.agencia = agencia;
        next();
    }else{
        res.json({status: 404, message: "Agencia no encontrada..."}).status(404);
    }
};

export default checkAgencia;
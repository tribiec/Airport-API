import AgenciaModelo from '../models/agencia';

class Agencias {

    static async getAgencia(req,res){
        res.json({ status: 200, message: {...req.agencia[0]} }).status(200);
    }

    static async getAgencias(req, res) {
        const agencias = await AgenciaModelo({ solicitud: 'Agencias' });
        if (agencias.length >= 1) {
            res.json({ status: 200, message: [...agencias] }).status(200);
        } else {
            res.json({ status: 404, message: "No se encontraron agencias..." }).status(404);
        }
    }

    static async getAgencias_Aeropuerto(req,res){
        const agencias = await AgenciaModelo({ solicitud: 'Agencias_aero', params: [req.id_aeropuerto]});
        if (agencias.length >= 1) {
            res.json({ status: 200, message: [...agencias] }).status(200);
        } else {
            res.json({ status: 404, message: "No se encontraron agencias en el aeropuerto..." }).status(404);
        }
    }
    
}

export default Agencias;
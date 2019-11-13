import VuelosModelo from '../models/vuelos';

const date = new Date(Date.now());

class Vuelos {

    static async getVuelos_Aeropuerto(req, res) {

        const tiempo = {
            minutos: date.getMinutes(),
            hora: date.getHours(),
            dia: date.getDate(),
            mes: date.getMonth(),
            year: date.getFullYear()
        };

        const vuelos = await VuelosModelo.getTodos([req.id_aeropuerto, req.id_aeropuerto, (tiempo.mes + 1), tiempo.dia, tiempo.year]);
        const llegadas = vuelos.filter(vuelo => (vuelo.destino_id === req.id_aeropuerto));
        const salidas = vuelos.filter(vuelo => (vuelo.origen_id === req.id_aeropuerto));
        if (llegadas.length >= 1 || salidas.length >= 1) {
            res.json({ status: 200, message: { llegadas: [...llegadas], salidas: [...salidas] } }).status(200);
        } else {
            res.json({ status: 404, message: "No hay vuelos encontrados" }).status(404);
        }
    }

    static async getVuelos_Agencia(req,res){
        const vuelos = await VuelosModelo.getAgencia([req.id_agencia]);
        if(vuelos.length >= 1){
            res.json({status: 200, message: [...vuelos]}).status(200);
        }else{
            res.json({status: 404, message: "No hay vuelos encontrados para la agencia..."}).status(404);
        }
    }

    static async reiniciar(req,res){
        const vuelos = await VuelosModelo.reiniciar();
        if(vuelos){
            res.json({status: 200, message: "Fecha de vuelos actualizados con exito..."}).status(200);
        }else{
            res.json({status: 400, message: "Error al actualizar Fecha de Vuelos"}).status(400);
        }
    }

}

export default Vuelos;
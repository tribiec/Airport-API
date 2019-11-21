import Loader from './loader';

class Ticket {

    static crearTicket(params) {
        return this.getData('crearTicket', params);
    }

    static crearFactura(params) {
        return this.getData('crearFactura', params);
    }

    static getTickets(params){
        return this.getData('getTickets', params)
    }

    static async getData(selector, params) {
        const query = this.querys(selector);
        return await Loader(query, params);
    }

    static querys(selector) {
        switch (selector) {
            case 'correo':
                return "SELECT * FROM users WHERE correo = '?'";
            case 'crearTicket':
                return "INSERT INTO public.boletos(id_user, id_vuelo, id_agencia, id_factura) VALUES (?, ?, ?, ?) RETURNING id_boleto";
            case 'crearFactura':
                return "INSERT INTO public.facturas(id_user, referencia, monto) VALUES (?, ?, ?) RETURNING id_factura";
            case 'getTickets':
                return "SELECT B.id_boleto, B.id_vuelo, B.id_agencia, B.id_factura, V.id_ruta, V.date, V.time, V.id_aerolinea, R.origen, R.destino FROM boletos as B INNER JOIN vuelos AS V ON B.id_vuelo = V.id_vuelo INNER JOIN rutas AS R ON V.id_ruta = R.id_ruta WHERE B.id_user = ?";
            default:
                return '';
        }
    }
}

export default Ticket;
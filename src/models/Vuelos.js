import Loader from './loader';

class Vuelos {

    static getTodos(params) {
        return this.getData('todos',params);
    }

    static getAgencia(params) {
        return this.getData('agencia',params);
    }

    static getActual(params) {
        return this.getData('actual',params);
    }

    static reiniciar(){
        return this.getData('reiniciar');
    }

    static async getData(selector,params) {
        const query = this.querys(selector);
        return await Loader(query, params);
    }

    static querys(selector) {
        switch (selector) {
            case 'todos':
                return "SELECT v.id_vuelo, v.id_status, airOrigen.nombre AS origen_nombre, airOrigen.id_aeropuerto AS origen_id, airOrigen.ciudad as origen_ciudad, airDestino.nombre AS destino_nombre, airDestino.id_aeropuerto AS destino_id, airDestino.ciudad AS destino_ciudad, aerolinea.nombre AS aerolinea_nombre, v.date, v.time FROM vuelos AS v INNER JOIN rutas as r ON v.id_ruta = r.id_ruta INNER JOIN aeropuertos AS airDestino ON r.destino = airDestino.id_aeropuerto INNER JOIN aeropuertos as airOrigen on r.origen = airOrigen.id_aeropuerto INNER JOIN aerolineas AS aerolinea ON v.id_aerolinea = aerolinea.id_aerolinea WHERE (r.destino = '?' OR r.origen = '?') AND v.date = '?/?/?' ORDER BY date ASC, time ASC";
            case 'actual':
                return "SELECT v.id_vuelo, v.id_status, airOrigen.nombre AS origen_nombre, airOrigen.id_aeropuerto AS origen_id, airOrigen.ciudad as origen_ciudad, airDestino.nombre AS destino_nombre, airDestino.id_aeropuerto AS destino_id, airDestino.ciudad AS destino_ciudad, aerolinea.nombre AS aerolinea_nombre, v.date, v.time FROM vuelos AS v INNER JOIN rutas as r ON v.id_ruta = r.id_ruta INNER JOIN aeropuertos AS airDestino ON r.destino = airDestino.id_aeropuerto INNER JOIN aeropuertos as airOrigen on r.origen = airOrigen.id_aeropuerto INNER JOIN aerolineas AS aerolinea ON v.id_aerolinea = aerolinea.id_aerolinea WHERE (r.destino = '?' OR r.origen = '?') AND v.date = '?/?/?' AND v.time > '?:?' ORDER BY date ASC, time ASC";
            case 'agencia':
                return "SELECT V.id_vuelo, airOrigen.id_aeropuerto AS origen_id, airOrigen.nombre AS origen_nombre, airOrigen.ciudad AS origen_ciudad, airOrigen.latitude AS origen_latitude, airOrigen.longitude AS origen_longitude, airDest.id_aeropuerto AS destino_id, airDest.nombre AS destino_nombre, airDest.ciudad AS destino_ciudad, airDest.latitude AS destino_latitude, airDest.longitude AS destino_longitude, V.date, V.time, v.id_status, aerolineas.id_aerolinea, aerolineas.nombre AS aerolinea_nombre FROM vuelos_agencias as VA INNER JOIN vuelos AS V ON VA.id_vuelo = V.id_vuelo INNER JOIN rutas AS R ON V.id_ruta = R.id_ruta INNER JOIN aeropuertos AS airDest ON r.destino = airDest.id_aeropuerto INNER JOIN aeropuertos AS airOrigen ON r.origen = airOrigen.id_aeropuerto INNER JOIN aerolineas ON v.id_aerolinea = aerolineas.id_aerolinea WHERE VA.id_agencia = ?";
            case 'reiniciar':
                return "UPDATE vuelos SET date = '11/13/2019'";
            default:
                return '';
        }
    }
}

export default Vuelos;
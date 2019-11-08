const Loader = require('./Loader');

const Vuelos = async ({ solicitud, params }) => {
    const query = querys(solicitud);
    return await Loader({query, params});
}

const querys = (solicitud) => {
    switch (solicitud) {
        case 'todos':
            return "SELECT v.id_vuelo, v.id_status, airOrigen.nombre AS origen_nombre, airOrigen.id_aeropuerto AS origen_id, airOrigen.ciudad as origen_ciudad, airDestino.nombre AS destino_nombre, airDestino.id_aeropuerto AS destino_id, airDestino.ciudad AS destino_ciudad, aerolinea.nombre AS aerolinea_nombre, v.date, v.time FROM vuelos AS v INNER JOIN rutas as r ON v.id_ruta = r.id_ruta INNER JOIN aeropuertos AS airDestino ON r.destino = airDestino.id_aeropuerto INNER JOIN aeropuertos as airOrigen on r.origen = airOrigen.id_aeropuerto INNER JOIN aerolineas AS aerolinea ON v.id_aerolinea = aerolinea.id_aerolinea WHERE (r.destino = '?' OR r.origen = '?') AND v.date = '?/?/?' ORDER BY date ASC, time ASC";
        case 'actual':
            return "SELECT v.id_vuelo, v.id_status, airOrigen.nombre AS origen_nombre, airOrigen.id_aeropuerto AS origen_id, airOrigen.ciudad as origen_ciudad, airDestino.nombre AS destino_nombre, airDestino.id_aeropuerto AS destino_id, airDestino.ciudad AS destino_ciudad, aerolinea.nombre AS aerolinea_nombre, v.date, v.time FROM vuelos AS v INNER JOIN rutas as r ON v.id_ruta = r.id_ruta INNER JOIN aeropuertos AS airDestino ON r.destino = airDestino.id_aeropuerto INNER JOIN aeropuertos as airOrigen on r.origen = airOrigen.id_aeropuerto INNER JOIN aerolineas AS aerolinea ON v.id_aerolinea = aerolinea.id_aerolinea WHERE (r.destino = '?' OR r.origen = '?') AND v.date = '?/?/?' AND v.time > '?:?' ORDER BY date ASC, time ASC";
        default:
            return '';
    }
}

module.exports = Vuelos;
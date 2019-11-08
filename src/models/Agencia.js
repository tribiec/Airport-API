const Loader = require('./Loader');

const Agencia = async ({ solicitud, params }) => {
    const query = querys(solicitud);
    return await Loader({ query, params });
}

const querys = (solicitud) => {
    switch (solicitud) {
        case 'Agencias':
            return 'SELECT * FROM agencias';
        case 'Agencias_aero':
            return "SELECT * FROM agencias WHERE id_aeropuerto = '?'"
        case 'Agencia':
            return "SELECT * FROM agencias WHERE id_agencia = ?";
        case 'Vuelos':
            return 'SELECT V.id_vuelo, airOrigen.id_aeropuerto AS origen_id, airOrigen.nombre AS origen_nombre, airOrigen.ciudad as origen_ciudad, airDest.id_aeropuerto AS destino_id, airDest.nombre as destino_nombre, airDest.ciudad as destino_ciudad, V.date, V.time, v.id_status, aerolineas.id_aerolinea, aerolineas.nombre AS aerolinea_nombre FROM vuelos_agencias as VA INNER JOIN vuelos AS V ON VA.id_vuelo = V.id_vuelo INNER JOIN rutas AS R ON V.id_ruta = R.id_ruta INNER JOIN aeropuertos AS airDest ON r.destino = airDest.id_aeropuerto INNER JOIN aeropuertos AS airOrigen ON r.origen = airOrigen.id_aeropuerto INNER JOIN aerolineas ON v.id_aerolinea = aerolineas.id_aerolinea WHERE VA.id_agencia = ?';
        default:
            return '';
    }
}

module.exports = Agencia;
const Loader = require('./Loader');

const Aeropuerto = async ({ solicitud, params }) => {
    const query = querys(solicitud);
    return await Loader({query, params});
}

const querys = (solicitud) => {
    switch (solicitud) {
        case 'aeropuertos':
            return "SELECT nombre, latitude, longitude, id_aeropuerto, ciudad FROM aeropuertos ORDER BY ciudad DESC";
        case 'aeropuerto':
            return `SELECT nombre, latitude, longitude, id_aeropuerto FROM aeropuertos WHERE id_aeropuerto = '?'`;
        default:
            return '';
    }
}

module.exports = Aeropuerto;
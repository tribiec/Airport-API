import Loader from './loader';

class Aeropuerto {

    static getAeropuertos() {
        return this.getData('aeropuertos');
    }

    static getAeropuerto(params) {
        return this.getData('aeropuerto',params);
    }

    static async getData(selector,params){
        const query = this.querys(selector);
        return await Loader(query, params);
    }

    static querys(solicitud) {
        switch (solicitud) {
            case 'aeropuertos':
                return "SELECT nombre, latitude, longitude, id_aeropuerto, ciudad FROM aeropuertos ORDER BY ciudad DESC";
            case 'aeropuerto':
                return `SELECT nombre, latitude, longitude, id_aeropuerto FROM aeropuertos WHERE id_aeropuerto = '?'`;
            default:
                return '';
        }
    }

}

export default Aeropuerto;
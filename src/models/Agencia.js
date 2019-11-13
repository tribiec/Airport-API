import Loader from './loader';

class Agencia {

    static getAgencias() {
        return this.getData('agencias');
    }
    static getAgencias_Aero(params) {
        return this.getData('agencias_aero', params);
    }
    
    static getAgencia(params) {
        return this.getData('agencia', params);
    }

    static async getData(selector, params) {
        const query = this.querys(selector);
        return await Loader(query, params);
    }

    static querys(selector) {
        switch (selector) {
            case 'agencias':
                return 'SELECT * FROM agencias';
            case 'agencias_aero':
                return "SELECT * FROM agencias WHERE id_aeropuerto = '?'"
            case 'agencia':
                return "SELECT * FROM agencias WHERE id_agencia = ?";
            default:
                return '';
        }
    }

}

export default Agencia;
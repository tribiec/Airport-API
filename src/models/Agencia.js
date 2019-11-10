import Loader from './loader';

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
        default:
            return '';
    }
}

export default Agencia;
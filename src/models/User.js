import Loader from './loader';

const User = async ({ solicitud, params }) => {
    const query = querys(solicitud);
    return await Loader({ query, params });
}

const querys = (solicitud) => {
    switch (solicitud) {
        case 'correo':
            return "SELECT * FROM users WHERE correo = '?'";
        default:
            return '';
    }
}

export default User;
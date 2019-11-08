const Loader = require('./Loader');

const User = async ({ solicitud, params }) => {
    const query = querys(solicitud);
    return await Loader({ query, params });
}

const querys = (solicitud) => {
    switch (solicitud) {
        case 'User_correo':
            return "SELECT * FROM users WHERE correo = '?'";
        default:
            return '';
    }
}

module.exports = User;
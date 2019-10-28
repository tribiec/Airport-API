const db = require('../../database/Conexion');
const { createToken } = require('../../controladores/token')
const checkUser = async ({ correo, clave }, res) => {
    let query = await db.query(`SELECT * FROM users WHERE correo = '${correo}'`);
    if (query.length === 0) {
        //! Usuario no existe
        res.json({
            status: 401,
            message: "Usuario no existe..."
        }).status(401)
    } else {
        query = query[0]
        //* Acceso Correcto
        if (query.clave === clave) {
            delete query.clave, delete query.id_user, delete query.super_user;
            createToken(query, (err, token) => {
                query.token = token
                res.json({
                    status: 200,
                    message: query
                }).status(200);
            });
        } else {
            //! Clave errada...
            res.json({
                status: 402,
                message: "Clave incorrecta..."
            }).status(401)
        }
    }
}
module.exports = { checkUser };

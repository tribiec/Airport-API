import db from '../database';

const Loader = async (query, params) => {
    if (params) {
        if (checkConsistencia(query, params)) {
            params.forEach(param => {
                query = query.replace("?", param);
            });
        } else {
            console.log("(Loader) Error en Params -->", query, params);
            return [];
        }
    }
    return await getData(query);
}

const checkConsistencia = (query, params) => {
    const numParametros = query.split("").reduce((prev, current) => ((current === "?") ? prev + 1 : prev), 0);
    return (numParametros === params.length) ? true : false;
}

const getData = (dato) => {
    return new Promise((resolve, reject) => {
        try {
            const query = db.query(dato).then(e => e.rows);
            resolve(query);
        } catch (err) {
            reject(err);
        }
    }).then(query => query).catch(err => console.log(err));
}

export default Loader;
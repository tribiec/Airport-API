import { db } from '../controladores/database/Conexion'

const addAeropuerto = (nombre,icao) => {
    db.query("SELECT * FROM aeropuertos").then(e => {
        console.log(e);
    })
}
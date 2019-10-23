const initOptions = {/* initialization options */};
const pgp = require('pg-promise')(initOptions);
const db = pgp('postgres://postgres:1234@localhost:5432/aeropuerto');
module.exports = db;
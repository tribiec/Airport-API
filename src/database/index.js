import pgPromise from 'pg-promise';
const config = {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || "postgres",
    pass: process.env.DB_PASS || 1234,
    db: process.env.DB_DATABASE || "aeropuerto"
};
const pgp = pgPromise({/* initialization options */});
const db = pgp(`postgres://${config.user}:${config.pass}@${config.host}:${config.port}/${config.db}`);
export default db;
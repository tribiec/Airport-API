import { Client } from 'pg';
const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    db: process.env.DB_DATABASE
};
const db = new Client({
    connectionString: `postgres://${config.user}:${config.pass}@${config.host}:${config.port}/${config.db}`
});
db.connect();
export default db;
import { query } from '../database/Conexion';
const at = async () => {
    const a = await query("SELECT * FROM users");
    console.log(a);
}
at();
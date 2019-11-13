import Loader from './loader';

class User {

    static getUser_Correo(params) {
        return this.getData('correo',params);
    }
    
    static async getData(selector,params){
        const query = this.querys(selector);
        return await Loader(query, params);
    }

    static querys(selector) {
        switch (selector) {
            case 'correo':
                return "SELECT * FROM users WHERE correo = '?'";
            default:
                return '';
        }
    }
}

export default User;
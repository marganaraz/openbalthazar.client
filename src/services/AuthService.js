import axios from 'axios';
import { Config } from './../config/Config';

////////////////////////////////////////////////////
// Llama al metodo Login de la API
////////////////////////////////////////////////////
export const login = (tokenId) => {
    
    // Llamo a la API
    return axios.post(Config.OpenBalthazarAPI + "/auth/login?tokenId=" + tokenId);
};
import axios from 'axios';
import { Config } from '../config/Config';

////////////////////////////////////////////////////
// Llama al metodo ScanAll de la API
////////////////////////////////////////////////////
export const scanAll = () => {
    
    const token = JSON.parse(localStorage.getItem("user")).token;
    
    // Llamo a la API
    return axios.get(Config.OpenBalthazarAPI + "/etherscan/scanAll",
        { 
             headers: 
             {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + token
             } 
         }
    );
};
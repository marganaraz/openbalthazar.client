import axios from 'axios';
import { Config } from './../config/Config';

////////////////////////////////////////////////////
// Llama al metodo Scan de la API
////////////////////////////////////////////////////
export const scan = (currentFile, code) => {
    
    const token = JSON.parse(localStorage.getItem("user")).token;

    var bodyFormData = new FormData();
    bodyFormData.set('path', currentFile);
    bodyFormData.set('code', code);
    
    // Llamo a la API
    return axios.post(Config.OpenBalthazarAPI + "/scanner/scan", bodyFormData,
        { 
             headers: 
             {
                 'Content-Type': 'multipart/form-data',
                 'Authorization': 'Bearer ' + token
             } 
         }
    );
};
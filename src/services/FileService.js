import axios from 'axios';
import { Config } from './../config/Config';

////////////////////////////////////////////////////
// Llama al metodo GetFile de la API
////////////////////////////////////////////////////
export const loadFile = (path) => {
  
  const token = JSON.parse(localStorage.getItem("user")).token;

  // Llamo a la API para obtener los archivos
  return axios.get(Config.OpenBalthazarAPI + "/file/getfile?path=" + path,
    { 
      headers: 
      {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
      } 
    }
  );
};

////////////////////////////////////////////////////
// Llama al metodo GetByUser de la API
////////////////////////////////////////////////////
export const getFilesByUser = (path) => {

  const token = JSON.parse(localStorage.getItem("user")).token;

  // Llamo a la API para obtener los archivos
  return axios.get(Config.OpenBalthazarAPI + "/file/getByUser",
    { 
      headers: 
      {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
      } 
    }
  )
};

////////////////////////////////////////////////////
// Llama al metodo New de la API
////////////////////////////////////////////////////
export const newFile = (filename) => {

    const token = JSON.parse(localStorage.getItem("user")).token;

    // Llamo a la API para crear un archivo
    return axios.get(Config.OpenBalthazarAPI + "/file/new?name=" + filename,
      { 
        headers: 
        {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        } 
      }
    )
};

////////////////////////////////////////////////////
// Llama al metodo Delete de la API
////////////////////////////////////////////////////
export const deleteFile = (filename) => {

  const token = JSON.parse(localStorage.getItem("user")).token;

  // Llamo a la API para crear un archivo
  return axios.get(Config.OpenBalthazarAPI + "/file/delete?path=" + filename,
    { 
      headers: 
      {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
      } 
    }
  )
};

////////////////////////////////////////////////////
// Llama al metodo New de la API
////////////////////////////////////////////////////
export const uploadFile = (file) => {

  const token = JSON.parse(localStorage.getItem("user")).token;

  var bodyFormData = new FormData();
  bodyFormData.set('file', file);

  // Llamo a la API para subir un archivo
  return axios.post(Config.OpenBalthazarAPI + "/file/upload", bodyFormData,
    { 
      headers: 
      {
        'Content-Type': 'multipart/form-data',  
        'Authorization': 'Bearer ' + token
          
      } 
    }
  )
};

////////////////////////////////////////////////////
// Llama al metodo Import de la API
////////////////////////////////////////////////////
export const importFile = (address) => {

  const token = JSON.parse(localStorage.getItem("user")).token;

  // Llamo a la API para crear un archivo
  return axios.get(Config.OpenBalthazarAPI + "/file/import?address=" + address,
    { 
      headers: 
      {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
      } 
    }
  )
};
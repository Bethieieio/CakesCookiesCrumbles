import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

export const axiosReq  = axios.create();
export const axiosRes  = axios.create();



import axios from 'axios'

axios.default.baseURL = '';
axios.default.withCredentials = true;

export const axiosReq  = axios.create();
export const axiosRes  = axios.create();

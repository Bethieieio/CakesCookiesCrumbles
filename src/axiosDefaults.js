import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

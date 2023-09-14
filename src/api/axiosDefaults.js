import axios from "axios";

axios.defaults.baseURL = "https://drf-api-recc-56264b48b50b.herokuapp.com/";
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
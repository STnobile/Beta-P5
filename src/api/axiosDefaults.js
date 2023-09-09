import axios from "axios";

axios.defaults.baseURL = 'https://project5-beta-ad2d8a677c36.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
import axios from "axios";

const rawApiBaseUrl =
  process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/";
const normalizedApiBaseUrl = rawApiBaseUrl.endsWith("/")
  ? rawApiBaseUrl
  : `${rawApiBaseUrl}/`;

axios.defaults.baseURL = normalizedApiBaseUrl;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export const axiosReq = axios.create();
export const axiosRes = axios.create();

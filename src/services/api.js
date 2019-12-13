import axios from 'axios';
import { getToken } from "./auth";

// Alterar baseURL dps
const api = axios.create({ 
    baseURL: 'https://frozen-fortress-37712.herokuapp.com/api'
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default api;
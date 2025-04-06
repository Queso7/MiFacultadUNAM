import axios from 'axios';
import { getToken, removeToken } from './auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Interceptor para añadir token a cada request
api.interceptors.request.use((config) => {
  const token = getToken(); // Obtener token de localStorage o cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores 401 (No autorizado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken(); // Eliminar token inválido
      window.location.href = '/login'; // Redirigir a login
    }
    return Promise.reject(error);
  }
);

export default api;
// src/api/apiClient.js
import axios from 'axios';

// 1. Crear instancia de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // URL base de tu backend
  timeout: 10000, // Tiempo máximo de espera
  headers: {
    'Content-Type': 'application/json', // Header por defecto
  },
});

// 2. Interceptor para añadir token a las peticiones
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 3. Interceptor para manejar errores globales
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirigir a login
    }
    return Promise.reject(error);
  }
);

export default apiClient;
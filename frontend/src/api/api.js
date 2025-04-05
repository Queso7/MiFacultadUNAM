import axios from 'axios';

const API_URL = 'http://tu-servidor:5000/api'; // Cambia según tu IP o dominio

export const fetchData = async () => {
  const response = await axios.get(`${API_URL}/data`);
  return response.data;
};
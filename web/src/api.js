import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Substitua pela URL do seu back-end
});

// Interceptor para adicionar o token JWT ao cabeçalho
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Busca o token armazenado
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
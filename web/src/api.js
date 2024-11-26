import axios from 'axios';

import { refreshToken } from './auth'; // Importe a função de renovação do token

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 5000, // Adiciona um timeout opcional
});

// Interceptador para adicionar o token no cabeçalho
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Propaga erros de configuração
    }
);

// Interceptador para lidar com erros de resposta (e.g., token expirado)
api.interceptors.response.use(
    (response) => response, // Retorna a resposta diretamente se não houver erro
    async (error) => {
        const originalRequest = error.config;

        // Verifica se é um erro 401 e se já não foi tentado renovar o token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Marca a requisição como já tentada

            try {
                // Tenta renovar o token
                const newToken = await refreshToken();
                if (newToken) {
                    localStorage.setItem('accessToken', newToken); // Salva o novo token
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest); // Reenvia a requisição com o novo token
                }
            } catch (refreshError) {
                console.error('Erro ao renovar o token:', refreshError);
                // Redireciona o usuário para a página de login se necessário
                window.location.href = '/login';
            }
        }
        return Promise.reject(error); // Propaga o erro caso não consiga renovar o token
    }
);

// **Adicione esta linha para exportar a instância do Axios como padrão**
export default api;

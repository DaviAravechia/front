import axios from 'axios';


import { refreshToken } from './auth'; // Importe a função de renovação do token

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 15000, // Adiciona um timeout opcional
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

const enviarDados = async () => {
    try {
        const response = await api.post('/auth/jwt-login/', { username: 'Teste', password: '1234', email: 'teste@email.com' });
        console.log('Dados enviados com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        if (error.response) {
            console.error('Erro do servidor:', error.response.data);
        } else if (error.request) {
            console.error('Sem resposta do servidor:', error.request);
        } else {
            console.error('Erro na configuração:', error.message);
        }
    }
};

const fetchPacientes = async () => {
    setError(''); // Limpa mensagens de erro antes de cada nova tentativa
    try {
      const response = await api.get('/pacientes/');
      setPacientes(response.data);
      setFilteredPacientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error.response?.data || error.message);
      setError('Erro ao buscar pacientes. Tente novamente mais tarde.');
    }
  };

// enviarDados();


export default api;

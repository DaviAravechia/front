import api from './api'; // Certifique-se de usar 'default export'

// Função para renovar o token (exemplo):
export const refreshToken = async () => {
    try {
        const refresh = localStorage.getItem('refreshToken');
        const response = await api.post('/auth/token/refresh/', { refresh });
        localStorage.setItem('accessToken', response.data.access);
        return response.data.access;
    } catch (error) {
        console.error('Erro ao renovar o token:', error);
        return null;
    }
};

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // URL base do back-end
});

// Interceptor para adicionar o token JWT ao cabeçalho
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Busca o token armazenado
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Rotas relacionadas ao login e autenticação
export const login = (data) => api.post('/auth/jwt-login/', data); // Login usando JWT

// Pacientes
export const listarPacientes = () => api.get('/paciente/');
export const cadastrarPaciente = (data) => api.post('/paciente/create/', data);
export const atualizarPaciente = (id, data) => api.put(`/paciente/${id}/`, data);
export const excluirPaciente = (id) => api.delete(`/paciente/${id}/delete/`);

// Consultas
export const listarConsultasPorPaciente = (pacienteId) => api.get(`/paciente/${pacienteId}/consultas/`);
export const agendarConsulta = (data) => api.post('/consulta/', data);

export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh_token'); // Token de refresh
    const response = await api.post('/auth/jwt-refresh/', { refresh });
    localStorage.setItem('token', response.data.access); // Atualiza o token de acesso
    return response.data.access;
  } catch (err) {
    console.error('Erro ao atualizar o token:', err);
    localStorage.removeItem('token'); // Remove o token inválido
    localStorage.removeItem('refresh_token');
    alert('Sessão expirada. Faça login novamente.');
    window.location.href = '/login'; // Redireciona para a página de login
  }
};
// Exporte a instância padrão do Axios para outras requisições
export default api;

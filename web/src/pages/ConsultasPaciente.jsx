import api from '../api';

async function listarConsultas(pacienteId) {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get(`paciente/${pacienteId}/consultas/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Consultas:', response.data);
  } catch (error) {
    console.error('Erro ao listar consultas:', error);
  }
}

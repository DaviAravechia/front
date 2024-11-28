import api from '../api';

async function criarPaciente(pacienteData) {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post('paciente/create/', pacienteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Paciente criado:', response.data);
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
  }
}

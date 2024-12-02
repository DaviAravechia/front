import React, { useEffect, useState } from 'react';
import api from '../api';
import BotaoInicio from '../botao/BotaoInicio';

const AgendarConsulta = () => {
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [consulta, setConsulta] = useState({
    paciente: '',
    medico: '',
    data_hora: '',
    descricao: '',
    status: 'agendada', // Valor padrão para o status
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Função para buscar pacientes e médicos
  useEffect(() => {
    const fetchDados = async () => {
      try {
        const pacientesResponse = await api.get('/pacientes/');
        console.log('Pacientes carregados:', pacientesResponse.data);
        setPacientes(pacientesResponse.data);

        const medicosResponse = await api.get('/medicos/');
        console.log('Médicos carregados:', medicosResponse.data);
        setMedicos(medicosResponse.data);
      } catch (err) {
        setError('Erro ao carregar pacientes ou médicos.');
        console.error('Erro:', err.response?.data || err.message);
      }
    };
    fetchDados();
  }, []);

  // Função para agendar consulta
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    console.log('Dados enviados para agendamento:', consulta);

    // Validar os dados antes do envio
    if (!consulta.paciente || !consulta.medico || !consulta.data_hora) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const response = await api.post('/consultas/', consulta);
      console.log('Resposta do servidor:', response.data);
      setSuccess('Consulta agendada com sucesso!');
      setConsulta({
        paciente: '',
        medico: '',
        data_hora: '',
        descricao: '',
        status: 'agendada',
      });
    } catch (err) {
      const errorResponse = err.response?.data || 'Erro inesperado';
      setError(`Erro ao agendar consulta: ${JSON.stringify(errorResponse)}`);
      console.error('Erro:', errorResponse);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsulta((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Agendar Consulta</h1>
      <BotaoInicio />

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Paciente:</label>
          <select name="paciente" value={consulta.paciente} onChange={handleChange} required>
            <option value="">Selecione um paciente</option>
            {pacientes.map((paciente) => (
              <option key={paciente.uuid} value={paciente.uuid}>
                {paciente.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Médico:</label>
          <select name="medico" value={consulta.medico} onChange={handleChange} required>
            <option value="">Selecione um médico</option>
            {medicos.map((medico) => (
              <option key={medico.uuid} value={medico.uuid}>
                {medico.nome} - {medico.especialidade || 'Especialidade não informada'}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Data e Hora:</label>
          <input
            type="datetime-local"
            name="data_hora"
            value={consulta.data_hora}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={consulta.status} onChange={handleChange} required>
            <option value="agendada">Agendada</option>
            <option value="concluida">Concluída</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={consulta.descricao}
            onChange={handleChange}
            placeholder="Descrição ou observações"
          ></textarea>
        </div>
        <button type="submit">Agendar Consulta</button>
      </form>
    </div>
  );
};

export default AgendarConsulta;

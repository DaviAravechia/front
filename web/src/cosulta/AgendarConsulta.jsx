import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BotaoInicio from '../botao/BotaoInicio';
import api from '../api';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #555;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const AgendarConsulta = () => {
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [consulta, setConsulta] = useState({ paciente: '', medico: '', data_hora: '', descricao: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const pacientesResponse = await api.get('/pacientes/');
        setPacientes(pacientesResponse.data);

        const medicosResponse = await api.get('/medicos/');
        setMedicos(medicosResponse.data);
      } catch (err) {
        setError('Erro ao carregar pacientes e médicos.');
        console.error('Erro:', err.response?.data || err.message);
      }
    };
    fetchDados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (!consulta.paciente || !consulta.medico || !consulta.data_hora) {
        setError('Todos os campos são obrigatórios.');
        return;
      }
      await api.post('/consultas/', consulta);
      setSuccess('Consulta agendada com sucesso!');
      setConsulta({ paciente: '', medico: '', data_hora: '', descricao: '' });
    } catch (err) {
      setError('Erro ao agendar consulta.');
      console.error('Erro:', err.response?.data || err.message);
    }
  };

  return (
    <Container>
      <BotaoInicio />
      <Header>Agendar Consulta</Header>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Paciente</Label>
          <Select name="paciente" onChange={(e) => setConsulta({ ...consulta, paciente: e.target.value })}>
            <option value="">Selecione um paciente</option>
            {pacientes.map((paciente) => (
              <option key={paciente.uuid} value={paciente.uuid}>
                {paciente.nome}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Médico</Label>
          <Select name="medico" onChange={(e) => setConsulta({ ...consulta, medico: e.target.value })}>
            <option value="">Selecione um médico</option>
            {medicos.map((medico) => (
              <option key={medico.uuid} value={medico.uuid}>
                {medico.nome}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Data e Hora</Label>
          <input
            type="datetime-local"
            name="data_hora"
            value={consulta.data_hora}
            onChange={(e) => setConsulta({ ...consulta, data_hora: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label>Descrição</Label>
          <textarea
            name="descricao"
            value={consulta.descricao}
            onChange={(e) => setConsulta({ ...consulta, descricao: e.target.value })}
          />
        </FormGroup>
        <Button type="submit">Agendar Consulta</Button>
      </form>
    </Container>
  );
};

export default AgendarConsulta;
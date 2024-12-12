import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BotaoInicio from '../botao/BotaoInicio';
import api from '../api';


const ListarConsultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchConsultas = async () => {
    setLoading(true);
    try {
      const response = await api.get('/consultas/');
      setConsultas(response.data);
    } catch (err) {
      console.error('Erro ao buscar consultas:', err.response?.data || err.message);
      setError('Erro ao carregar consultas. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (uuid) => {
    navigate(`/consultas/${uuid}/editar`);
  };

  const handleDelete = async (uuid) => {
    try {
      await api.delete(`/consultas/${uuid}/cancel/`);
      setConsultas((prev) => prev.filter((consulta) => consulta.uuid !== uuid));
    } catch (err) {
      console.error('Erro ao excluir consulta:', err.response?.data || err.message);
      setError('Erro ao excluir consulta. Tente novamente.');
    }
  };

  useEffect(() => {
    fetchConsultas();
  }, []);

  return (
    <Container>
      <BotaoInicio />
      <Header>Lista de Médicos</Header>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Table>
        <thead>
          <tr>
            <Th>Paciente</Th>
            <Th>Médico</Th>
            <Th>Data e Hora</Th>
            <Th>Status</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta) => (
            <tr key={consulta.uuid}>
              <Td>{consulta.paciente_nome || 'Não informado'}</Td>
              <Td>{consulta.medico_nome || 'Não informado'}</Td>
              <Td>{consulta.data_hora || 'Data não disponível'}</Td>
              <Td>{consulta.status}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListarConsultas;

  const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  `;
  const Header = styled.h1`
  color: #465d75;
  text-align: center;
  margin-bottom: 20px;
`;
  
  const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  `;
  
  const Th = styled.th`
    background-color: #007bff;
    color: white;
    padding: 10px;
    text-align: left;
  `;
  
  const Td = styled.td`
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
    color: #000;
  `;
  
  const Button = styled.button`
    padding: 5px 10px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  
    &.edit {
      background-color: #007bff;
      color: white;
      margin-right: 5px;
    }
  
    &.delete {
      background-color: #dc3545;
      color: white;
    }
  `;

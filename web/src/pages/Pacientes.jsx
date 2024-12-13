
const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchPacientes = async () => {
    try {
      const response = await api.get('/pacientes/');
      setPacientes(response.data);
      setFilteredPacientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error.response?.data || error.message);
      setError('Erro ao buscar pacientes. Tente novamente mais tarde.');
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  // Filtrar pacientes pelo nome ou CPF
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredPacientes(
      pacientes.filter(
        (paciente) =>
          paciente.nome.toLowerCase().includes(query) || 
          (paciente.cpf && paciente.cpf.includes(query))
      )
    );
  };

  const handleEdit = (uuid) => {
    navigate(`/pacientes/${uuid}/editar`);
  };

  const handleDelete = async (uuid) => {
    try {
      await api.delete(`/pacientes/${uuid}/`);
      setPacientes((prev) => prev.filter((paciente) => paciente.uuid !== uuid));
      setFilteredPacientes((prev) => prev.filter((paciente) => paciente.uuid !== uuid));
    } catch (err) {
      setError('Erro ao excluir paciente. Tente novamente.');
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <Container>
      <BotaoInicio />
      <Header>Lista de Pacientes</Header>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <SearchBar
        type="text"
        placeholder="Buscar por nome ou CPF"
        value={search}
        onChange={handleSearch}
      />
      <Table>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>CPF</Th>
            <Th>Email</Th>
            <Th>Telefone</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {filteredPacientes.map((paciente) => (
            <tr key={paciente.uuid}>
              <Td>{paciente.nome}</Td>
              <Td>{paciente.cpf || 'Não informado'}</Td>
              <Td>{paciente.email}</Td>
              <Td>{paciente.telefone}</Td>
              <Td>
                <Button className="edit" onClick={() => handleEdit(paciente.uuid)}>
                  Editar
                </Button>
                <Button className="delete" onClick={() => handleDelete(paciente.uuid)}>
                  Excluir
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </Container>
  );
};

export default Pacientes;

  import React, { useEffect, useState } from 'react';
  import styled from 'styled-components';
  import { useNavigate } from 'react-router-dom';
  import api from '../api';
  import BotaoInicio from '../botao/BotaoInicio';
  
  const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
    color: #000;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  `;
  
  const Header = styled.h1`
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  `;
  const td = styled.td`
    color: #555;
  `;
  const SearchBar = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ddd;
  `;
  
  const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  `;
  
  const Th = styled.th`
    background-color: #007bff;
    color: white;
    padding: 10px;
  `;
  
  const Td = styled.td`
    border: 1px solid #ddd;
    padding: 10px;
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
  
    &:hover {
      opacity: 0.9;
    }
  `;
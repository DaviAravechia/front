import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../api';
import BotaoInicio from '../botao/BotaoInicio';


const ListarMedicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [medico, setMedico] = useState({
    nome: '',
    especialidade: '',
    crm: '',
    telefone: '',
  });
  const [editing, setEditing] = useState(null);

  // Buscar médicos
  const fetchMedicos = async () => {
    try {
      const response = await api.get('/medicos/');
      setMedicos(response.data);
    } catch (err) {
      setError('Erro ao carregar médicos.');
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchMedicos();
  }, []);

  // Atualizar os campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedico((prev) => ({ ...prev, [name]: value }));
  };

  // Adicionar ou editar médico
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validar os dados antes de enviar
    if (!medico.nome || !medico.crm || !medico.telefone) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (!/^\d{4,6}-[A-Za-z]{2}$/.test(medico.crm)) {
      setError('O CRM deve seguir o formato 123456-XX.');
      return;
    }

    try {
      if (editing) {
        // Atualizar médico existente
        await api.put(`/medicos/${editing}/`, medico);
        setSuccess('Médico atualizado com sucesso!');
      } else {
        // Adicionar novo médico
        await api.post('/medicos/', medico);
        setSuccess('Médico cadastrado com sucesso!');
      }
      setMedico({ nome: '', especialidade: '', crm: '', telefone: '' });
      setEditing(null);
      fetchMedicos(); // Atualizar a lista de médicos
    } catch (err) {
      setError('Erro ao salvar médico. Verifique os dados e tente novamente.');
      console.error('Erro ao salvar médico:', err.response?.data || err.message);
    }
  };

  // Excluir médico
 

  // Iniciar edição de médico
 

  return (
    <Container>
      <BotaoInicio />
      <Header>Lista de Médicos</Header>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <Table>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>CRM</Th>
            <Th>Especialidade</Th>
            <Th>Telefone</Th>
          </tr>
        </thead>
        <tbody>
          {medicos.map((medico) => (
            <tr key={medico.uuid}>
              <Td>{medico.nome}</Td>
              <Td>{medico.crm}</Td>
              <Td>{medico.especialidade || 'Não informado'}</Td>
              <Td>{medico.telefone}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListarMedicos;


    const Container = styled.div`
      max-width: 900px;
      margin: 0 auto;
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
    
      &:hover {
        opacity: 0.9;
      }
    `;
    
    const Form = styled.form`
      margin-top: 20px;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    `;
    
    const Input = styled.input`
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
    `;
    
    const SubmitButton = styled.button`
      width: 100%;
      padding: 10px;
      background-color: #28a745;
      color: white;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    
      &:hover {
        opacity: 0.9;
      }
    `;

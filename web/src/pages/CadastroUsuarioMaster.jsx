
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../api';
import BotaoInicio from '../botao/BotaoInicio';

const CadastrarMedico = () => {
  const [medicos, setMedicos] = useState([]);
  const [medico, setMedico] = useState({
    nome: '',
    especialidade: '',
    crm: '',
    telefone: '',
  });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Buscar médicos




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

    try {
      if (editing) {
        await api.put(`/medicos/${editing}/`, medico);
        setSuccess('Médico atualizado com sucesso!');
      } else {
        await api.post('/medicos/', medico);
        setSuccess('Médico cadastrado com sucesso!');
      }
      setMedico({ nome: '', especialidade: '', crm: '', telefone: '' });
      setEditing(null);
      fetchMedicos();
    } catch (err) {
      if (err.response?.data?.crm) {
        setError(err.response.data.crm[0]);
      } else {
        setError('Erro ao salvar médico. Verifique os dados e tente novamente.');
      }
      console.error(err.response?.data || err.message);
    }
  };

  // Excluir médico
  const handleDelete = async (uuid) => {
    if (window.confirm('Tem certeza que deseja excluir este médico?')) {
      try {
        await api.delete(`/medicos/${uuid}/`);
        setMedicos((prev) => prev.filter((medico) => medico.uuid !== uuid));
        setSuccess('Médico excluído com sucesso!');
      } catch (err) {
        setError('Erro ao excluir médico. Tente novamente.');
        console.error(err.response?.data || err.message);
      }
    }
  };

  // Iniciar edição de médico
  const handleEdit = (medico) => {
    setMedico(medico);
    setEditing(medico.uuid);
  };

  return (
    <Container>
      <HeaderBar>
        <BotaoInicio />
      </HeaderBar>
      <Header>Lista de Médicos</Header>

      <Form onSubmit={handleSubmit}>
        <h2>{editing ? 'Editar Médico' : 'Adicionar Médico'}</h2>
        <Input
          type="text"
          name="nome"
          value={medico.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
          <Input
            type="text"
            name="crm"
            value={medico.crm}
            onChange={handleChange}
            placeholder="CRM (Ex: 123456-SP)"
            required
          />
          <Input
            type="tel"
            name="telefone"
            value={medico.telefone}
            onChange={handleChange}
            placeholder="Telefone"
            required
          />
        <Input
          type="text"
          name="especialidade"
          value={medico.especialidade}
          onChange={handleChange}
          placeholder="Especialidade"
        />
        <SubmitButton type="submit">
          {editing ? 'Salvar Alterações' : 'Adicionar Médico'}
        </SubmitButton>
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </Form>
    </Container>
  );
};

export default CadastrarMedico;

// Estilizações
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  color: #000;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const HeaderBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
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
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
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
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 10px;
`;
const SuccessMessage = styled.p`
  color: green;
  text-align: center;
  margin-bottom: 10px;
`;

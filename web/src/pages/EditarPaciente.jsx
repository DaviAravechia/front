import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api';
import BotaoInicio from '../botao/BotaoInicio';

const Container = styled.div`
  max-width: 600px;
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

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
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

const EditarPaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState({
    nome: '',
    data_nascimento: '',
    telefone: '',
    historico_medico: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await api.get(`/pacientes/${id}/`);
        setPaciente(response.data);
      } catch (err) {
        setError('Erro ao carregar dados do paciente.');
        console.error(err.response?.data || err.message);
      }
    };

    fetchPaciente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/pacientes/${id}/`, paciente);
      alert('Paciente atualizado com sucesso!');
      navigate('/pacientes');
    } catch (err) {
      setError('Erro ao atualizar o paciente. Tente novamente.');
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <Container>
      <BotaoInicio/>
      <Header>Editar Paciente</Header>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome:</Label>
          <Input
            type="text"
            name="nome"
            value={paciente.nome || ''}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>CPF:</Label>
          <Input
            type="text"
            name="cpf"
            value={paciente.cpf || ''}
            onChange={handleChange}
            placeholder="Digite o CPF (somente números)"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Data de Nascimento:</Label>
          <Input
            type="date"
            name="data_nascimento"
            value={paciente.data_nascimento || ''}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Telefone:</Label>
          <Input
            type="text"
            name="telefone"
            value={paciente.telefone || ''}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Histórico Médico:</Label>
          <textarea
            name="historico_medico"
            value={paciente.historico_medico || ''}
            onChange={handleChange}
          ></textarea>
        </FormGroup>
        <SubmitButton type="submit">Salvar</SubmitButton>
      </form>
    </Container>
  );
};

export default EditarPaciente;

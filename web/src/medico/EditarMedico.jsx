import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../api";

const EditarMedico = () => {
  const { id } = useParams(); // Obter ID do médico
  const [medico, setMedico] = useState({
    nome: "",
    especialidade: "",
    crm: "",
    telefone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Buscar dados do médico para edição
  useEffect(() => {
    const fetchMedico = async () => {
      try {
        const response = await api.get(`/medicos/${id}/`);
        setMedico(response.data);
      } catch (err) {
        setError("Erro ao carregar dados do médico.");
        console.error(err.response?.data || err.message);
      }
    };
    fetchMedico();
  }, [id]);

  // Atualizar médico
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.put(`/medicos/${id}/`, medico);
      setSuccess("Médico atualizado com sucesso!");
      navigate("/medicos"); // Volta para a lista
    } catch (err) {
      console.error("Erro ao atualizar médico:", err.response?.data || err.message);
      setError("Erro ao atualizar médico. Verifique os dados e tente novamente.");
    }
  };

  // Atualizar os campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedico((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <Header>Editar Médico</Header>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="nome"
          placeholder="Nome"
          value={medico.nome}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="especialidade"
          placeholder="Especialidade"
          value={medico.especialidade}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="crm"
          placeholder="CRM"
          value={medico.crm}
          onChange={handleChange}
          required
        />
        <Input
          type="tel"
          name="telefone"
          placeholder="Telefone"
          value={medico.telefone}
          onChange={handleChange}
          required
        />
        <Button type="submit">Atualizar</Button>
      </Form>
    </Container>
  );
};

export default EditarMedico;

// Estilizações são as mesmas usadas nas páginas anteriores

// Estilizações
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
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

  &.save,
  &.add {
    background-color: #007bff;
    color: white;
    width: 100%;
    padding: 10px;
    font-size: 16px;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const Form = styled.form`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
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

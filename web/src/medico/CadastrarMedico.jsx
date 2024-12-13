import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api";

const ListarMedicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Buscar lista de médicos
  const fetchMedicos = async () => {
    try {
      const response = await api.get("/medicos/");
      setMedicos(response.data);
    } catch (err) {
      setError("Erro ao carregar médicos.");
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchMedicos();
  }, []);

  return (
    <Container>
      <Header>Lista de Médicos</Header>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Table>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>CRM</Th>
            <Th>Especialidade</Th>
            <Th>Telefone</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {medicos.map((medico) => (
            <tr key={medico.id}>
              <Td>{medico.nome}</Td>
              <Td>{medico.crm}</Td>
              <Td>{medico.especialidade || "Não informado"}</Td>
              <Td>{medico.telefone}</Td>
              <Td>
                <Button
                  className="edit"
                  onClick={() => navigate(`/medicos/editar/${medico.id}`)}
                >
                  Editar
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button className="add" onClick={() => navigate("/medicos/cadastrar")}>
        Cadastrar Médico
      </Button>
    </Container>
  );
};

export default ListarMedicos;

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
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  margin-top: 20px;

  &.edit {
    background-color: #007bff;
    color: white;
    margin-right: 5px;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

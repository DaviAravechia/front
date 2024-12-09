import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 50px;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const Header = styled.h1`
  color: #333;
  margin-bottom: 30px;
`;

const LinkGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const Button = styled(Link)`
  text-decoration: none;
  padding: 15px 30px;
  font-size: 16px;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const Dashboard = () => {
  return (
    <Container>
      <Header>Bem-vindo ao Sistema de Gerenciamento</Header>
      <LinkGroup>
        <Button to="/consultas">Lista de Consultas</Button>
        <Button to="/medicos">Lista de Médicos</Button>
        <Button to="/consultas/agendar">Agendar Consulta</Button>
        <Button to="/pacientes">Pacientes</Button>
      </LinkGroup>
    </Container>
  );
};

export default Dashboard;

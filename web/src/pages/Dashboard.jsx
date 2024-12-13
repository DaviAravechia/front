import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Ajuste para o container da página
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centraliza o conteúdo */
  width: 100vw; /* Garante que o container ocupe a largura total */
  height: 100vh; /* Garante que o container ocupe a altura total */
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://media.discordapp.net/attachments/828314681243467780/1316947561592127618/female-nurse-clinic-practicing-medicine.jpg?ex=675ce67e&is=675b94fe&hm=a34f70c0c8f3e21d11ef97fd9c96e73d32fa54c9e8c71738d40d0fe7f6a98f99&=&format=webp&width=526&height=350');
    background-size: cover; /* Faz com que a imagem cubra a tela inteira */
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;
  }
`;

const HeaderBar = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 1;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 1;
`;

const Header = styled.h1`
  color: white; /* Texto em branco */
  margin-bottom: 30px;
  font-size: 2rem;
  z-index: 1;
`;

const LinkGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  z-index: 1;
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
  const navigate = useNavigate();

  useEffect(() => {
    // Ajuste do body com apenas os estilos necessários
    const body = document.querySelector('body');
    body.style.margin = '0';
    body.style.display = 'flex';

    // Elementos extras como ul/nav que devem ser ocultos
    const unwantedElements = document.querySelectorAll('ul, nav');
    unwantedElements.forEach((el) => {
      el.style.display = 'none'; // Oculta listas ou menus desnecessários
    });
  }, []);

  const handleLogout = () => {
    console.log('Logout acionado');
    localStorage.clear(); // Remove os dados do usuário
    navigate('/'); // Redireciona para a página inicial ou de login
  };

  return (
    <Container>
      <HeaderBar>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </HeaderBar>
      <MenuSection>
        <Header>Bem-vindo ao Sistema de Gerenciamento</Header>
        <LinkGroup>
          <Button to="/consultas">Minhas consultas</Button>
          <Button to="/medicos">Lista de Médicos</Button>
          <Button to="/consultas/agendar">Agendar Consulta</Button>
        </LinkGroup>
      </MenuSection>
    </Container>
  );
};

export default Dashboard;

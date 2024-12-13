import React from "react";
import styled from "styled-components";
import BotaoInicio from "../botao/BotaoInicio";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`;

const MessageContainer = styled.div`
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-width: 400px;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #555;
`;

const CadastroUsuarioManutencao = () => {
  return (
    <Container>
      <MessageContainer>
        <Title>Manutenção</Title>
        <Message>
          O cadastro de usuários está temporariamente indisponível para
          manutenção. Por favor, tente novamente mais tarde.
        </Message>
      </MessageContainer>
    </Container>
  );
};

export default CadastroUsuarioManutencao;

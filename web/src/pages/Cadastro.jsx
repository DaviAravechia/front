import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api";
import BotaoInicio from '../botao/BotaoInicio';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
  padding: 20px; /* Adicionado para evitar problemas em telas pequenas */
`;

const HeaderBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start; /* Alinha o botão Início à esquerda */
  margin-bottom: 20px; /* Espaço entre o botão e o formulário */
`;

const Form = styled.form`
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
  min-height: 100px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 1rem;
  color: red;
  font-size: 0.9rem;
`;

const DateTimeContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
`;

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [horaNascimento, setHoraNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [historicoMedico, setHistoricoMedico] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/register-patient/", {
        nome,
        email,
        data_nascimento: dataNascimento,
        cpf,
        telefone,
        historico_medico: historicoMedico,
        password,
      });

      alert("Cadastro realizado com sucesso!");
      navigate("/dashboard"); // Redireciona para o dashboard após o cadastro
    } catch (err) {
      console.error("Erro ao realizar cadastro:", err.response?.data || err.message);

      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Erro ao realizar cadastro. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <HeaderBar>
        <BotaoInicio />
      </HeaderBar>
      <Form onSubmit={handleCadastro}>
        <Title>Cadastro</Title>
        <Input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <DateTimeContainer>
          <Input
            type="date"
            placeholder="Data de Nascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </DateTimeContainer>
        <Input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
        <Textarea
          placeholder="Histórico Médico"
          value={historicoMedico}
          onChange={(e) => setHistoricoMedico(e.target.value)}
        ></Textarea>
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  );
};

export default Cadastro;

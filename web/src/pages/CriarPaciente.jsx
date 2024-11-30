import React, { useState } from 'react';
import { cadastrarPaciente } from '../api';
import { useNavigate } from 'react-router-dom';

const CriarPaciente = () => {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [historicoMedico, setHistoricoMedico] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !dataNascimento || !telefone) {
      alert('Os campos Nome, Data de Nascimento e Telefone são obrigatórios.');
      return;
    }

    try {
      await cadastrarPaciente({
        nome,
        data_nascimento: dataNascimento,
        telefone,
        email,
        historico_medico: historicoMedico,
      });
      alert('Paciente cadastrado com sucesso!');
      navigate('/restrito/paciente');
    } catch (err) {
      console.error('Erro ao cadastrar paciente:', err.response?.data || err.message);
      alert('Erro ao cadastrar paciente. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div>
      <h1>Cadastrar Paciente</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome"
        />
        <label>Data de Nascimento:</label>
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          placeholder="Selecione a data de nascimento"
        />
        <label>Telefone:</label>
        <input
          type="tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="Digite o telefone"
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite o email"
        />
        <label>Histórico Médico:</label>
        <textarea
          value={historicoMedico}
          onChange={(e) => setHistoricoMedico(e.target.value)}
          placeholder="Insira o histórico médico (opcional)"
        ></textarea>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CriarPaciente;

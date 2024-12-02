import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import BotaoInicio from '../botao/BotaoInicio'; // Botão para voltar ao Dashboard

const CadastrarMedico = () => {
  const [medico, setMedico] = useState({ nome: '', especialidade: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Atualizar os campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedico((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar os dados do médico para o back-end
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post('/medicos/', medico);
      setSuccess('Médico cadastrado com sucesso!');
      setMedico({ nome: '', especialidade: '' });
      navigate('/medicos'); // Redireciona para a lista de médicos
    } catch (err) {
      console.error('Erro ao cadastrar médico:', err.response?.data || err.message);
      setError('Erro ao cadastrar o médico. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h1>Cadastrar Médico</h1>
      <BotaoInicio /> {/* Botão para voltar ao Dashboard */}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={medico.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Especialidade:</label>
          <input
            type="text"
            name="especialidade"
            value={medico.especialidade}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarMedico;

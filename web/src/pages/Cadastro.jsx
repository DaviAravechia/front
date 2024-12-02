import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento após cadastro
import api from '../api';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    data_nascimento: '',
    telefone: '',
    cpf: '',
    historico_medico: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Atualizar os campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/pacientes/', formData);
      setMessage('Paciente cadastrado com sucesso!');
      setFormData({ nome: '', data_nascimento: '', telefone: '', cpf: '', historico_medico: '' }); // Limpar formulário
      setTimeout(() => navigate('/pacientes'), 2000); // Redirecionar após 2 segundos
    } catch (error) {
      console.error('Erro no cadastro:', error.response?.data || error.message);
      setMessage('Erro no cadastro. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h2>Cadastrar Paciente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
        />
        <input
          type="date"
          name="data_nascimento"
          placeholder="Data de Nascimento"
          value={formData.data_nascimento}
          onChange={handleChange}
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleChange}
        />
        <textarea
          name="historico_medico"
          placeholder="Histórico Médico"
          value={formData.historico_medico}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Cadastro;

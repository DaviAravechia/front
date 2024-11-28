import React, { useState } from 'react';
import api from '../api';


function CadastroPaciente() {
  const [formData, setFormData] = useState({
    nome: '',
    data_nascimento: '',
    telefone: '',
    email: '',
    historico_medico: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Recupera o token do localStorage
      if (!token) {
        alert('Usuário não autenticado.');
        return;
      }
  
      // Adiciona o token no cabeçalho da requisição
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      console.log('Form Data:', formData); // Debug
      console.log('Headers:', headers); // Debug
  
      await api.post('paciente/create/', formData, { headers });
      alert('Paciente cadastrado com sucesso!');
      window.location.href = '/pacientes';
    } catch (err) {
      console.error('Erro ao cadastrar paciente:', err);
      alert('Erro ao cadastrar paciente. Verifique o console para mais detalhes.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Cadastro de Paciente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            name="data_nascimento"
            value={formData.data_nascimento}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Histórico Médico:</label>
          <textarea
            name="historico_medico"
            value={formData.historico_medico}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroPaciente;

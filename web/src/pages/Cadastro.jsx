import React, { useState } from 'react';
import api from '../api';

function CadastroPaciente() {
  const [formData, setFormData] = useState({
    nome: '',
    data_nascimento: '',
    telefone: '',
    historico_medico: '',
    cpf: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('restrito/pacientes/', formData);
      alert('Paciente cadastrado com sucesso!');
    } catch (err) {
      console.error('Erro ao cadastrar paciente:', err);
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
          <label>Histórico Médico:</label>
          <textarea
            name="historico_medico"
            value={formData.historico_medico}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroPaciente;

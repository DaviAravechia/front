import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { atualizarPaciente, listarPacientes } from '../api';

const EditarPaciente = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await api.get(`/paciente/${id}/`);
        setPaciente(response.data);
      } catch (err) {
        console.error('Erro ao carregar paciente:', err);
        alert('Erro ao carregar paciente.');
        navigate('/restrito/paciente');
      }
    };
  
    fetchPaciente();
  }, [id, navigate]); 

  const handleChange = (e) => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await atualizarPaciente(id, paciente);
      alert('Paciente atualizado com sucesso!');
      navigate('/restrito/paciente');
    } catch (err) {
      console.error('Erro ao atualizar paciente:', err);
      alert('Erro ao atualizar paciente.');
    }
  };

  if (!paciente) {
    return <p>Carregando dados do paciente...</p>;
  }

  return (
    <div>
      <h2>Editar Paciente</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="nome" value={paciente.nome || ''} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={paciente.email || ''} onChange={handleChange} />
        </label>
        <label>
          Telefone:
          <input type="tel" name="telefone" value={paciente.telefone || ''} onChange={handleChange} />
        </label>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditarPaciente;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const EditarPaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState({
    nome: '',
    data_nascimento: '',
    telefone: '',
    historico_medico: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('ID do paciente não fornecido.');
      return;
    }

    const fetchPaciente = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/pacientes/${id}/`);
        setPaciente(response.data);
      } catch (err) {
        setError('Erro ao carregar dados do paciente.');
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaciente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/pacientes/${id}/`, paciente);
      alert('Paciente atualizado com sucesso!');
      navigate('/pacientes');
    } catch (err) {
      setError('Erro ao atualizar o paciente. Por favor, tente novamente.');
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Editar Paciente</h1>
      {loading && <p>Carregando dados...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={paciente.nome || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            name="data_nascimento"
            value={paciente.data_nascimento || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            name="telefone"
            value={paciente.telefone || ''}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div>
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={paciente.cpf || ''}
            onChange={handleChange}
            required
          />
        </div> */}
        <div>
          <label>Histórico Médico:</label>
          <textarea
            name="historico_medico"
            value={paciente.historico_medico || ''}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
};

export default EditarPaciente;

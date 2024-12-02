import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import BotaoInicio from '../botao/BotaoInicio'; // Importa o botão reutilizável

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para buscar pacientes
  const fetchPacientes = async () => {
    setLoading(true);
    try {
      const response = await api.get('/pacientes/');
      setPacientes(response.data);
    } catch (err) {
      console.error('Erro ao buscar pacientes:', err.response?.data || err.message);
      setError('Erro ao carregar pacientes. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir um paciente
  const handleDelete = async (id, nome) => {
    if (!id) {
      setError('Erro: ID do paciente não foi encontrado.');
      return;
    }

    const confirmar = window.confirm(`Tem certeza que deseja excluir o paciente "${nome}"?`);
    if (!confirmar) {
      return; // Cancela a exclusão se o usuário não confirmar
    }

    try {
      await api.delete(`/pacientes/${id}/`);
      alert(`Paciente "${nome}" excluído com sucesso!`);
      fetchPacientes(); // Atualiza a lista
    } catch (err) {
      console.error('Erro ao excluir paciente:', err.response?.data || err.message);
      setError('Não foi possível excluir o paciente.');
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lista de Pacientes</h1>
      <BotaoInicio /> {/* Botão "Início" para voltar ao Dashboard */}

      <Link to="/cadastro" style={styles.link}>
        <button style={styles.button}>Cadastrar Novo Paciente</button>
      </Link>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={styles.list}>
        {pacientes.map((paciente) => (
          <li key={paciente.id || paciente.uuid} style={styles.listItem}>
            <Link to={`/pacientes/${paciente.id || paciente.uuid}/editar`} style={styles.link}>
              {paciente.nome}
            </Link>
            <button
              style={styles.button}
              onClick={() => handleDelete(paciente.id || paciente.uuid, paciente.nome)}
            >
              Excluir
            </button>
            <Link to={`/pacientes/${paciente.id || paciente.uuid}/editar`} style={styles.link}>
              <button style={styles.button}>Editar</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid #ddd',
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: '#007BFF',
  },
};

export default Pacientes;

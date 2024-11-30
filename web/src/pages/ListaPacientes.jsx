import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarPacientes, excluirPaciente } from '../api';

const ListaPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  const fetchPacientes = async () => {
    try {
      const response = await listarPacientes();
      setPacientes(response.data);
    } catch (err) {
      console.error('Erro ao carregar pacientes:', err);
      alert('Erro ao carregar pacientes.');
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (!id) {
        throw new Error('ID do paciente não encontrado.');
      }
      await excluirPaciente(id);
      alert('Paciente deletado com sucesso!');
      fetchPacientes(); // Atualiza a lista após exclusão
    } catch (err) {
      console.error('Erro ao deletar paciente:', err);
      alert('Erro ao deletar o paciente.');
    }
  };
  

  return (
    <div>
      <h1>Lista de Pacientes</h1>
      <button onClick={() => navigate('/restrito/paciente/novo')}>Novo Paciente</button>
      {pacientes.map((paciente) => (
        <div key={paciente.id}>
          <span>{paciente.nome}</span>
          <button onClick={() => navigate(`/restrito/paciente/${paciente.id}/editar`)}>Editar</button>
          <button onClick={() => handleDelete(paciente.id)}>Deletar</button>
        </div>
      ))}
    </div>
  );
};

export default ListaPacientes; // Exportação padrão

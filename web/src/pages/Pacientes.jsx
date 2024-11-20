import React, { useEffect, useState } from 'react';
import api from '../api';

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await api.get('restrito/pacientes/');
        setPacientes(response.data);
      } catch (err) {
        console.error('Erro ao buscar pacientes:', err);
      }
    };

    fetchPacientes();
  }, []);

  return (
    <div>
      <h2>Lista de Pacientes</h2>
      <ul>
        {pacientes.map((paciente) => (
          <li key={paciente.id}>{paciente.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default Pacientes;

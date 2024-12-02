import React, { useEffect, useState } from 'react';
import api from '../api';
import BotaoInicio from '../botao/BotaoInicio'; // Importa o botão reutilizável

const ListarMedicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [error, setError] = useState('');

  const fetchMedicos = async () => {
    try {
      const response = await api.get('/medicos/');
      setMedicos(response.data);
    } catch (err) {
      setError('Erro ao carregar médicos.');
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchMedicos();
  }, []);

  return (
    <div>
      <h1>Lista de Médicos</h1>
      <BotaoInicio /> {/* Botão para voltar ao Dashboard */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {medicos.map((medico) => (
            <li key={medico.uuid}>
                <p>{medico.nome}</p>
                <p>CRM: {medico.crm}</p>
                <p>Especialidade: {medico.especialidade || 'Não informado'}</p>
            </li>
  ))}
</ul>
    </div>
  );
};

export default ListarMedicos;

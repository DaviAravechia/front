import React, { useEffect, useState } from 'react';
import api from '../api';

function Consultas() {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await api.get('restrito/consulta/');
        setConsultas(response.data);
      } catch (err) {
        console.error('Erro ao buscar consultas:', err);
      }
    };

    fetchConsultas();
  }, []);

  return (
    <div>
      <h2>Lista de Consultas</h2>
      <ul>
        {consultas.map((consulta) => (
          <li key={consulta.uuid}>
            {consulta.paciente.nome} - {consulta.data_hora}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Consultas;

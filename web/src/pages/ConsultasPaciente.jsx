import React, { useEffect, useState } from "react";
import api from "../api";

function ConsultasPaciente({ pacienteId }) {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`paciente/${pacienteId}/consultas/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConsultas(response.data);
      } catch (err) {
        console.error("Erro ao listar consultas:", err);
      }
    };

    fetchConsultas();
  }, [pacienteId]);

  return (
    <div>
      <h2>Consultas do Paciente</h2>
      <ul>
        {consultas.map((consulta) => (
          <li key={consulta.uuid}>
            {consulta.descricao} - {consulta.data_hora}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConsultasPaciente;

import React, { useEffect, useState } from "react";
import api from "../api";

function Pacientes() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("paciente/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPacientes(response.data);
      } catch (err) {
        console.error("Erro ao buscar pacientes:", err);
      }
    };

    fetchPacientes();
  }, []);

  return (
    <div>
      <h2>Lista de Pacientes</h2>
      <ul>
        {pacientes.map((paciente) => (
          <li key={paciente.uuid}>
            <p>Nome: {paciente.nome}</p>
            <button onClick={() => (window.location.href = `/pacientes/${paciente.uuid}/consultas`)}>
              Ver Consultas
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pacientes;

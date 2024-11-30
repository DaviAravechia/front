import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function CadastroPaciente() {
  const { uuid } = useParams(); // Captura o UUID do paciente (se existir)
  const [paciente, setPaciente] = useState({ nome: "", email: "" });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Se o UUID existir, estamos no modo de edição
    if (uuid) {
      setIsEditMode(true);
      const fetchPaciente = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await api.get(`paciente/${uuid}/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPaciente(response.data); // Carrega os dados do paciente
        } catch (err) {
          console.error("Erro ao carregar dados do paciente:", err);
        }
      };
      fetchPaciente();
    }
  }, [uuid]);

  const handleChange = (e) => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (isEditMode) {
        // Modo de edição
        await api.put(`paciente/${uuid}/`, paciente, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Paciente atualizado com sucesso!");
      } else {
        // Modo de cadastro
        await api.post("paciente/", paciente, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Paciente cadastrado com sucesso!");
      }
      window.location.href = "/pacientes"; // Redireciona para a lista de pacientes
    } catch (err) {
      console.error("Erro ao salvar paciente:", err);
      alert("Erro ao salvar paciente.");
    }
  };

  return (
    <div>
      <h2>{isEditMode ? "Editar Paciente" : "Cadastrar Paciente"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={paciente.nome}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={paciente.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">{isEditMode ? "Salvar Alterações" : "Cadastrar"}</button>
      </form>
    </div>
  );
}

export default CadastroPaciente;

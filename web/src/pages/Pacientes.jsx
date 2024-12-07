import React, { useEffect, useState } from "react";
import api from "../api";

const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await api.get("/pacientes/");
                setPacientes(response.data);
            } catch (error) {
                console.error("Erro ao buscar pacientes:", error.response?.data || error.message);
                setError("Erro ao buscar pacientes. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };
        fetchPacientes();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Lista de Pacientes</h2>
            {loading && <p style={styles.loading}>Carregando...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {!loading && !pacientes.length && <p style={styles.empty}>Nenhum paciente encontrado.</p>}
            <ul style={styles.list}>
                {pacientes.map((paciente) => (
                    <li key={paciente.uuid} style={styles.listItem}>
                        <strong>{paciente.nome}</strong> - {paciente.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        padding: "2rem",
        backgroundColor: "#f9f9f9",
    },
    title: {
        textAlign: "center",
        marginBottom: "1.5rem",
        color: "#333",
    },
    list: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    listItem: {
        padding: "1rem",
        borderBottom: "1px solid #ddd",
    },
    error: {
        textAlign: "center",
        color: "red",
        marginBottom: "1rem",
    },
    loading: {
        textAlign: "center",
        color: "#666",
    },
    empty: {
        textAlign: "center",
        color: "#999",
    },
};

export default Pacientes;

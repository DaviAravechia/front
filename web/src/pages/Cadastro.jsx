import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [telefone, setTelefone] = useState("");
    const [historicoMedico, setHistoricoMedico] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleCadastro = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await api.post("/auth/register-patient/", {
                nome,
                email,
                data_nascimento: dataNascimento,
                telefone,
                historico_medico: historicoMedico,
                password,
            });
            alert("Cadastro realizado com sucesso!");
            navigate("/login"); // Redireciona para o login após o cadastro
        } catch (error) {
            console.error("Erro ao realizar cadastro:", error.response?.data || error.message);
            setError(error.response?.data?.detail || "Erro ao realizar cadastro. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleCadastro} style={styles.form}>
                <h2 style={styles.title}>Cadastro</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="date"
                    placeholder="Data de Nascimento"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    style={styles.input}
                    required
                />
                <textarea
                    placeholder="Histórico Médico"
                    value={historicoMedico}
                    onChange={(e) => setHistoricoMedico(e.target.value)}
                    style={styles.textarea}
                ></textarea>
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </button>
                {error && <p style={styles.error}>{error}</p>}
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f9",
    },
    form: {
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
    },
    title: {
        marginBottom: "1.5rem",
        color: "#333",
    },
    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "1rem",
        borderRadius: "4px",
        border: "1px solid #ddd",
        fontSize: "1rem",
    },
    textarea: {
        width: "100%",
        padding: "10px",
        marginBottom: "1rem",
        borderRadius: "4px",
        border: "1px solid #ddd",
        fontSize: "1rem",
        minHeight: "100px",
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        fontSize: "1rem",
        cursor: "pointer",
    },
    error: {
        marginTop: "1rem",
        color: "red",
        fontSize: "0.9rem",
    },
};

export default Cadastro;
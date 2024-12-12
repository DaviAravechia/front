import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionamento após login
import api from "../api"; // Certifique-se de que a URL base está configurada corretamente

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isIntranet, setIsIntranet] = useState(false); // Alternar entre login comum e intranet
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/jwt-login/", { username, password });
      console.log("Login bem-sucedido:", response.data);

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      // Redirecionar com base no tipo de usuário
      if (isIntranet) {
        navigate("/dashboard"); // Página para superusuários
      } else {
        navigate("/dashboard"); // Página para usuários comuns
      }
    } catch (err) {
      console.error("Erro no login:", err.response?.data || err.message);
      setError(err.response?.data?.detail || "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h1 style={styles.title}>Login</h1>

        {/* Alternar entre Usuário e Intranet */}
        <div style={styles.toggleContainer}>
          <button
            type="button"
            onClick={() => setIsIntranet(false)}
            style={isIntranet ? styles.toggleButton : styles.activeToggleButton}
          >
            Usuário
          </button>
          <button
            type="button"
            onClick={() => setIsIntranet(true)}
            style={isIntranet ? styles.activeToggleButton : styles.toggleButton}
          >
            Intranet
          </button>
        </div>

        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Entrando..." : "Login"}
        </button>
        {error && <p style={styles.error}>{error}</p>}
        <p style={styles.text}>Não possui um usuário ? Crie agora um <a href="/cadastro">cadastro</a></p>
      </form>
    </div>
  );
};

// Estilos para o componente
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
  },
  text: {
    color: "#000",
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
  toggleContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  toggleButton: {
    width: "48%",
    padding: "10px",
    backgroundColor: "#ddd",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  activeToggleButton: {
    width: "48%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Login;

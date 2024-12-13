import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

      navigate("/dashboard");
    } catch (err) {
      console.error("Erro no login:", err.response?.data || err.message);
      setError(err.response?.data?.detail || "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img
          src="https://media.discordapp.net/attachments/828314681243467780/1316947561592127618/female-nurse-clinic-practicing-medicine.jpg?ex=675ce67e&is=675b94fe&hm=a34f70c0c8f3e21d11ef97fd9c96e73d32fa54c9e8c71738d40d0fe7f6a98f99&=&format=webp&width=526&height=350" // Substitua por uma URL da imagem que preferir
          alt="Imagem de destaque"
          style={styles.image}
        />
      </div>
      <div style={styles.formContainer}>
        <form onSubmit={handleLogin} style={styles.form}>
          <h1 style={styles.title}>Login</h1>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Entrando..." : "Login"}
          </button>
          {error && <p style={styles.error}>{error}</p>}
          <p style={styles.text}>
            Não possui um usuário? Crie agora um <a href="/cadastro-master" style={styles.link}>cadastro</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

// Estilos para o componente
const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f9",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  formContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  form: {
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "1.5rem",
    color: "#333",
    fontSize: "1.5rem",
    fontWeight: "bold",
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
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  error: {
    marginTop: "1rem",
    color: "red",
    fontSize: "0.9rem",
  },
  text: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "#666",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;

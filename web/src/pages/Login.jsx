import React, { useState } from "react";
import api from "../api"; // Certifique-se de que a URL base está configurada corretamente

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/register/", { username, password });
            console.log("Login bem-sucedido:", response.data);

            // Armazena o token de acesso
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);

            // Redirecionar ou realizar outras ações
            window.location.href = "/pacientes";
        } catch (err) {
            console.error("Erro no login:", err.response?.data || err.message);
            setError("Erro ao fazer login. Verifique suas credenciais.");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};

export default Login;

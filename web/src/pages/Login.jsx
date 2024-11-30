import React, { useState } from 'react';
import { login } from '../api'; // Importa o método login do api.js
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username: usuario, password: senha }); // Chama o método login
      localStorage.setItem('token', response.data.access); // Salva o token de acesso
      alert('Login realizado com sucesso!');
      navigate('/restrito/paciente'); // Redireciona após login bem-sucedido
    } catch (err) {
      console.error('Erro ao fazer login:', err.response?.data || err.message);
      const message = err.response?.data?.detail || 'Erro ao fazer login. Verifique suas credenciais.';
      alert(message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Usuário:</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Digite seu usuário"
        />
        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Chamada para a API de autenticação
      const response = await api.post('/api/auth/jwt-login/', { email, password });
      const { access, refresh } = response.data;

      // Armazena os tokens no localStorage
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // Redireciona para a página de pacientes
      navigate('/pacientes');
    } catch (err) {
      console.error('Erro ao fazer login:', err.response?.data || err.message);
      setError('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <form className="formLogin" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="formLoginInputs">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="formLoginButton">
          Entrar
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;

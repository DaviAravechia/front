import React, { useState } from 'react';
import api from '../api'; // Assumindo que você tem um arquivo de configuração da API

function Login() {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(''); // Estado para exibir erros

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recarregar a página
    try {
      // Envia os dados para o endpoint de login
      const response = await api.post('auth/jwt-login/', formData); // URL do Django para login JWT
      localStorage.setItem('token', response.data.access); // Salva o token JWT no localStorage
      alert('Login bem-sucedido!'); // Exibe mensagem de sucesso
      window.location.href = '/pacientes'; // Redireciona para a página de pacientes
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  // Função para atualizar os dados do formulário conforme o usuário digita
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para lidar com logout (se necessário)
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token JWT do localStorage
    alert('Logout realizado com sucesso!');
    window.location.href = '/'; // Redireciona para a página de login
  };

  return (
    <div>
      {localStorage.getItem('token') ? ( // Se o usuário já estiver logado, exibe o botão de logout
        <>
          <h2>Você já está logado!</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Usuário:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Senha:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe erros */}
            <button type="submit">Entrar</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Login;

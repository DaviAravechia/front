import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  // Verificar se o usuário está autenticado
  const isAuthenticated = !!localStorage.getItem('accessToken');

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  return (
    <nav>
      <ul style={{ display: 'flex', listStyleType: 'none', gap: '1rem' }}>
        {!isAuthenticated && (
          <li>
            <Link to="/">Login</Link>
          </li>
        )}
        {isAuthenticated && (
          <>
            <li>
              <Link to="/cadastro">Cadastro</Link>
            </li>
            <li>
              <Link to="/pacientes">Pacientes</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

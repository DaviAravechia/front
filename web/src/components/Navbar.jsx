import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/cadastro">Cadastro</Link>
        </li>
        <li>
          <Link to="/pacientes">Pacientes</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

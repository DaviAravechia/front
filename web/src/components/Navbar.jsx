import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/cadastro">Cadastrar Paciente</Link>
        </li>
        <li>
          <Link to="/pacientes">Lista de Pacientes</Link>
        </li>
        <li>
          <Link to="/consultas">Lista de Consultas</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

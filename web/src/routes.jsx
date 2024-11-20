import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CadastroPaciente from './pages/Cadastro';
import Pacientes from './pages/Pacientes';
import Navbar from './components/Navbar';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Página de login */}
        <Route path="/cadastro" element={<CadastroPaciente />} /> {/* Cadastro de paciente */}
        <Route path="/pacientes" element={<Pacientes />} /> {/* Lista de pacientes */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
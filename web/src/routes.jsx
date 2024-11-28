import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CadastroPaciente from './pages/Cadastro';
import Pacientes from './pages/Pacientes';
import ConsultasPaciente from './pages/ConsultasPaciente';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/pacientes/:pacienteId/consultas" element={<ConsultasPaciente />} />
        <Route path="/cadastro" element={<CadastroPaciente />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

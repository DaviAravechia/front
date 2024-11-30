import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ListaPacientes from './pages/ListaPacientes';
import CriarPaciente from './pages/CriarPaciente';
import EditarPaciente from './pages/EditarPaciente';
import ConsultasPaciente from './pages/ConsultasPaciente';
import Consultas from './pages/Consultas';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/restrito/paciente" element={<ListaPacientes />} />
        <Route path="/restrito/paciente/novo" element={<CriarPaciente />} />
        <Route path="/restrito/paciente/:id/editar" element={<EditarPaciente />} />
        <Route path="/restrito/paciente/:id" element={<ConsultasPaciente />} />
        <Route path="/restrito/consulta" element={<Consultas />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

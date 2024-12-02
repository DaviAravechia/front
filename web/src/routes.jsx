import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CadastroPaciente from './pages/Cadastro';
import Pacientes from './pages/Pacientes';
import Navbar from './components/Navbar';
import EditarPaciente from './pages/EditarPaciente';
import ListarMedicos from './medico/ListarMedicos';
import CadastrarMedico from './medico/CadastrarMedico';
import ListarConsultas from './medico/ListarConsultas';
import AgendarConsulta from './cosulta/AgendarConsulta';
import Dashboard from './pages/Dashboard'; // Importação do Dashboard
function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Página de login não exibe Navbar */}
        <Route path="/" element={<Login />} />

        {/* Páginas protegidas exibem Navbar */}
        <Route
          path="/cadastro"
          element={
            <>
              <Navbar />
              <CadastroPaciente />
            </>
          }
        />
        <Route
          path="/pacientes"
          element={
            <>
              <Navbar />
              <Pacientes />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/pacientes/:id/editar"
          element={
            <>
              <Navbar />
              <EditarPaciente />
            </>
          }
        />
        {/* Rotas para Médicos */}
        <Route
          path="/medicos"
          element={
            <>
              <Navbar />
              <ListarMedicos />
            </>
          }
        />
        <Route
          path="/medicos/cadastrar"
          element={
            <>
              <Navbar />
              <CadastrarMedico />
            </>
          }
        />
        {/* Rotas para Consultas */}
        <Route
          path="/consultas"
          element={
            <>
              <Navbar />
              <ListarConsultas />
            </>
          }
        />
        <Route
          path="/medicos/cadastrar"
          element={
            <>
              <Navbar />
              <CadastrarMedico />
            </>
          }
        
        />
        <Route
          path="/consultas/agendar"
          element={
            <>
              <Navbar />
              <AgendarConsulta />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

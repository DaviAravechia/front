import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CadastroPaciente from './pages/Cadastro';
import Pacientes from './pages/Pacientes';
import Navbar from './components/Navbar';
import EditarPaciente from './pages/EditarPaciente';
import ListarMedicos from './medico/ListarMedicos';
import CadastrarMedico from './medico/CadastrarMedico';
import ListarConsultas from './cosulta/ListarConsultas';
import AgendarConsulta from './cosulta/AgendarConsulta';
import EditarConsulta from './cosulta/EditarConsulta'; // Importar o componente de edição de consultas
import Dashboard from './pages/Dashboard'; // Importação do Dashboard
import AdminDashboard from './pages/AdminDashboard'; // Importação do Admin Dashboard

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
          path="/consultas/agendar"
          element={
            <>
              <Navbar />
              <AgendarConsulta />
            </>
          }
        />
        <Route
          path="/consultas/:uuid/editar"
          element={
            <>
              <Navbar />
              <EditarConsulta />
            </>
          }
        />

        {/* Rotas do Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <>
              <Navbar />
              <AdminDashboard />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

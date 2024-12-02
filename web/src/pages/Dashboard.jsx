import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <h1>Bem-vindo ao Sistema de Gerenciamento</h1>
      <div style={styles.links}>
        <Link to="/pacientes" style={styles.link}>
          <button style={styles.button}>Lista de Pacientes</button>
        </Link>
        <Link to="/consultas" style={styles.link}>
          <button style={styles.button}>Lista de Consultas</button>
        </Link>
        <Link to="/medicos" style={styles.link}>
          <button style={styles.button}>Lista de Médicos</button>
        </Link>
        <Link to="/consultas/agendar" style={styles.link}>
          <button style={styles.button}>Agendar Consulta</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  link: {
    textDecoration: 'none',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Dashboard;

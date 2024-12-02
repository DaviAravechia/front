import React from 'react';
import { Link } from 'react-router-dom';

const BotaoInicio = () => {
  return (
    <Link to="/dashboard" style={styles.link}>
      <button style={styles.button}>Início</button>
    </Link>
  );
};

const styles = {
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '1rem',
  },
  link: {
    textDecoration: 'none',
  },
};

export default BotaoInicio;

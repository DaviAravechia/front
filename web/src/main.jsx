import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes'; // Importa as rotas
import './index.css'; // Opcional: estilos globais

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes /> {/* Usa o componente de rotas */}
  </React.StrictMode>
);

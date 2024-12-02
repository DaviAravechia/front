import React, { useEffect, useState } from 'react';
import api from '../api';

const ListarConsultas = () => {
    const [consultas, setConsultas] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Função para buscar consultas
    const fetchConsultas = async () => {
        setLoading(true);
        try {
            const response = await api.get('/consultas/');
            console.log('Consultas:', response.data); // Verifique os dados retornados
            setConsultas(response.data);
        } catch (err) {
            console.error('Erro ao buscar consultas:', err.response?.data || err.message);
            setError('Erro ao carregar consultas. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConsultas();
    }, []);

    return (
        <div>
            <h1>Lista de Consultas</h1>
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {consultas.map((consulta) => (
                    <li key={consulta.uuid}>
                        <p>Paciente: {consulta.paciente_nome || 'Não informado'}</p>
                        <p>Médico: {consulta.medico_nome || 'Não informado'}</p>
                        <p>Data e Hora: {consulta.data_hora || 'Data não disponível'}</p>
                        <p>Status: {consulta.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListarConsultas;

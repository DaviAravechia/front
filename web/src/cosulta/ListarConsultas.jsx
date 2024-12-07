import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const ListarConsultas = () => {
    const [consultas, setConsultas] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Função para buscar consultas
    const fetchConsultas = async () => {
        setLoading(true);
        try {
            const response = await api.get('/consultas/');
            setConsultas(response.data);
        } catch (err) {
            console.error('Erro ao buscar consultas:', err.response?.data || err.message);
            setError('Erro ao carregar consultas. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    // Função para redirecionar para edição
    const handleEdit = (uuid) => {
        navigate(`/consultas/${uuid}/editar`);
    };

    // Função para excluir consulta
    const handleDelete = async (uuid) => {
        try {
            await api.delete(`/consultas/${uuid}/cancel/`);
            setConsultas((prev) => prev.filter((consulta) => consulta.uuid !== uuid));
        } catch (err) {
            console.error('Erro ao excluir consulta:', err.response?.data || err.message);
            setError('Erro ao excluir consulta. Tente novamente.');
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
                        <button onClick={() => handleEdit(consulta.uuid)}>Editar</button>
                        <button onClick={() => handleDelete(consulta.uuid)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListarConsultas;

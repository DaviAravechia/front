
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ConsultasPaciente = () => {
    const { pacienteId } = useParams();
    const [consultas, setConsultas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConsultas = async () => {
            try {
                const response = await fetch(`/paciente/${pacienteId}/consultas/`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                if (!response.ok) throw new Error('Erro ao carregar consultas.');
                const data = await response.json();
                setConsultas(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchConsultas();
    }, [pacienteId]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            <h1>Consultas do Paciente</h1>
            {consultas.length === 0 ? (
                <p>Nenhuma consulta encontrada.</p>
            ) : (
                <ul>
                    {consultas.map(consulta => (
                        <li key={consulta.id}>
                            <span>{consulta.data} - {consulta.horario}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ConsultasPaciente;

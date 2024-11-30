import React, { useState, useEffect } from 'react';
import { fetchPacientes } from '../api';

const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetchPacientes(token);
                setPacientes(response.data);
            } catch (err) {
                setError('Erro ao carregar pacientes.');
            } finally {
                setLoading(false);
            }
        };
        getPacientes();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            <h1>Pacientes</h1>
            <ul>
                {pacientes.map((paciente) => (
                    <li key={paciente.uuid}>
                        {paciente.nome} - {paciente.data_nascimento}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pacientes;

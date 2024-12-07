import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const EditarConsulta = () => {
    const { uuid } = useParams(); // Obtém o ID da consulta pela URL
    const [consulta, setConsulta] = useState(null);
    const [pacienteNome, setPacienteNome] = useState('');
    const [medicoNome, setMedicoNome] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Buscar os detalhes da consulta
    useEffect(() => {
        const fetchConsulta = async () => {
            try {
                const response = await api.get(`/consultas/${uuid}/`);
                setConsulta(response.data);

                // Busca os nomes do paciente e do médico usando os IDs
                const pacienteResponse = await api.get(`/pacientes/${response.data.paciente}/`);
                setPacienteNome(pacienteResponse.data.nome);

                const medicoResponse = await api.get(`/medicos/${response.data.medico}/`);
                setMedicoNome(medicoResponse.data.nome);
            } catch (err) {
                console.error('Erro ao buscar consulta:', err.response?.data || err.message);
                setError('Erro ao carregar consulta.');
            }
        };
        fetchConsulta();
    }, [uuid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConsulta((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await api.put(`/consultas/${uuid}/update/`, consulta);
            setSuccess('Consulta atualizada com sucesso!');
        } catch (err) {
            console.error('Erro ao atualizar consulta:', err.response?.data || err.message);
            setError('Erro ao atualizar consulta. Tente novamente.');
        }
    };

    if (!consulta) return <p>Carregando...</p>;

    return (
        <div>
            <h1>Editar Consulta</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Paciente:</label>
                    <input
                        type="text"
                        name="paciente_nome"
                        value={pacienteNome}
                        disabled // Campo apenas para exibição
                    />
                </div>
                <div>
                    <label>Médico:</label>
                    <input
                        type="text"
                        name="medico_nome"
                        value={medicoNome}
                        disabled // Campo apenas para exibição
                    />
                </div>
                <div>
                    <label>Data e Hora:</label>
                    <input
                        type="datetime-local"
                        name="data_hora"
                        value={consulta.data_hora}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select name="status" value={consulta.status} onChange={handleChange}>
                        <option value="agendada">Agendada</option>
                        <option value="concluida">Concluída</option>
                        <option value="cancelada">Cancelada</option>
                    </select>
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea
                        name="descricao"
                        value={consulta.descricao}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default EditarConsulta;

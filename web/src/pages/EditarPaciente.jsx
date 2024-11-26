// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../api';

// const EditarPaciente = () => {
//     const { id } = useParams(); // Obtém o ID do paciente da URL
//     const navigate = useNavigate();
//     const [paciente, setPaciente] = useState({});
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         console.log("ID recebido:", id); // Verifique se o ID é correto
//         const fetchPaciente = async () => {
//             if (!id) {
//                 setError('ID do paciente não fornecido.');
//                 return;
//             }
//             try {
//                 console.log("Fazendo requisição para o back-end...");
//                 const response = await api.get(`/restrito/pacientes/${id}/`);
//                 console.log("Dados do paciente recebidos:", response.data);
//                 setPaciente(response.data);
//             } catch (err) {
//                 console.error("Erro ao carregar dados do paciente:", err.response?.data || err.message);
//                 setError('Erro ao carregar dados do paciente.');
//             }
//         };
//         fetchPaciente();
//     }, [id]);
    

//     return (
//         <div>
//             <h1>Editar Paciente</h1>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Nome:</label>
//                     <input
//                         type="text"
//                         name="nome"
//                         value={paciente.nome || ''}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>Observações:</label>
//                     <textarea
//                         name="historico_medico"
//                         value={paciente.historico_medico || ''}
//                         onChange={handleChange}
//                     ></textarea>
//                 </div>
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Salvando...' : 'Salvar'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default EditarPaciente;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const EditarPaciente = () => {
    const { id } = useParams(); // Captura o ID do paciente da URL
    const navigate = useNavigate();
    const [paciente, setPaciente] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) {
            setError('ID do paciente não fornecido.');
            return;
        }

        const fetchPaciente = async () => {
            if (!id) {
                setError('ID do paciente não fornecido.');
                return;
            }
            try {
                // Corrigir o endpoint para corresponder ao back-end
                const response = await api.get(`/pacientes/${id}/`);
                setPaciente(response.data);
            } catch (err) {
                setError('Erro ao carregar dados do paciente.');
                console.error(err.response?.data || err.message);
            }
        };

        fetchPaciente();
    }, [id]);

    const handleChange = (e) => {
        setPaciente({ ...paciente, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.put(`/restrito/pacientes/${id}/`, paciente);
            navigate('/pacientes'); // Redireciona para a lista de pacientes
        } catch (err) {
            setError('Erro ao atualizar o paciente.');
            console.error(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Editar Paciente</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={paciente.nome || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Observações:</label>
                    <textarea
                        name="historico_medico"
                        value={paciente.historico_medico || ''}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar'}
                </button>
            </form>
        </div>
    );
};

export default EditarPaciente;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../api';

// const Pacientes = () => {
//     const [pacientes, setPacientes] = useState([]);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     const fetchPacientes = async () => {
//         setLoading(true);
//         try {
//             const response = await api.get('/restrito/pacientes/');
//             setPacientes(response.data);
//         } catch (err) {
//             console.error('Erro ao buscar pacientes:', err.response?.data || err.message);
//             setError('Erro ao carregar pacientes.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPacientes();
//     }, []);

//     return (
//         <div>
//             <h1>Lista de Pacientes</h1>
//             {loading && <p>Carregando...</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <ul>
//                 {pacientes.map((paciente) => (
//                     <li key={paciente.id}>
//                         <Link to={`/pacientes/${paciente.id}/editar`}>{paciente.nome}</Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Pacientes;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [error, setError] = useState('');

    const fetchPacientes = async () => {
        try {
            const response = await api.get('/restrito/pacientes/');
            setPacientes(response.data);
        } catch (err) {
            console.error('Erro ao buscar pacientes:', err.response?.data || err.message);
            setError('Erro ao carregar pacientes.');
        }
    };


    useEffect(() => {
        fetchPacientes();
    }, []);

    return (
        <div>
            <h1>Lista de Pacientes</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {pacientes.map((paciente) => (
                    <li key={paciente.id}>
                        {/* Certifique-se de que o ID está sendo passado corretamente */}
                        <Link to={`/pacientes/${paciente.id}/editar`}>{paciente.nome}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pacientes;

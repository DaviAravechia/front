import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pacientes from "./components/Pacientes";
import Consultas from "./components/Consultas"; // Certifique-se de que esse componente existe
import EditarPaciente from "./components/EditarPaciente"; // Certifique-se de que esse componente existe
import Login from "./components/Login"; // Certifique-se de que o componente Login existe

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Pacientes />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/pacientes/:uuid/consultas" element={<Consultas />} />
        <Route path="/pacientes/:uuid/editar" element={<EditarPaciente />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default App;


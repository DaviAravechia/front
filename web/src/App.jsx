import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Pacientes from "./pages/Pacientes";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/pacientes"
                    element={
                        <ProtectedRoute>
                            <Pacientes />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;

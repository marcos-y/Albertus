import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login'; // Importa tu componente de Login
import Home from './Home';   // Otro componente, por ejemplo, una página principal
import Dashboard from './Dashboard'; // Importa el componente Dashboard
import BarcodeScanner from './Components/BarcodeScanner';
import Pedidos from './Pedidos';
import VerPedidos from './VerPedidos';
import CargarPedidos from './CargarPedidos';
import Settings from './settings';
import Perfil from './Perfil';
import Sistema from './sistema';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated'));

  // Cargar estado desde localStorage una vez
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(auth);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  function PrivateRoute({ children }) {
    return isAuthenticated ? children : <Navigate to="/login" />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>} />
        <Route path="/pedidos" element={
          <PrivateRoute>
            <Pedidos />
          </PrivateRoute>} />
        <Route path="/verpedidos" element={
          <PrivateRoute>
            <VerPedidos />
          </PrivateRoute>} />
        <Route path="/cargarpedidos" element={
          <PrivateRoute>
            <CargarPedidos />
          </PrivateRoute>} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>} />
        <Route path="/settings" element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>} />
        <Route path="/perfil" element={
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>} />
        <Route path="/sistema" element={
          <PrivateRoute>
            <Sistema />
          </PrivateRoute>} />
       <Route path="/scanner" element={
          <PrivateRoute>
            <BarcodeScanner />
          </PrivateRoute>} />
      </Routes>
    </Router >
  );
}

export default App;

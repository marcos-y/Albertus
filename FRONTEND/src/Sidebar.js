import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Importamos `useNavigate` para redirigir

const Sidebar = () => {
  
  // Obtener el tipo de usuario desde el localStorage
  const clientType = localStorage.getItem('clientType');
  const navigate = useNavigate();  // Usamos `useNavigate` para redirigir a otra página

  // Función para cerrar sesión
  const handleLogout = () => {
    // Limpiar el localStorage (puedes eliminar más datos si es necesario)
    localStorage.removeItem('clientType');

     localStorage.clear();

    // Redirigir al usuario a la página de login
    navigate('/login');
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      {/*<div className="sidebar bg-dark text-white" style={{ width: '250px', height: '100vh' }}>*/}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '250px',
          height: '100vh',
          backgroundColor: '#333',
          color: 'white',
          padding: '20px',
          zIndex: 10
        }}
      >
        <h3 className="text-center p-4">Albertus SRL</h3>
        <ul className="nav flex-column">
          {/* Condición para Administrador */}
          {clientType === 'administrador' && (
            <>
               {/*<li className="nav-item">
                <Link to="/home" className="nav-link text-white">Home</Link>
              </li>
               */}
              <li className="nav-item">
                <Link to="/pedidos" className="nav-link text-white">Pedidos</Link>
              </li>
              {/*<li className="nav-item">
                <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/settings" className="nav-link text-white">Settings</Link>
              </li>
              <li className="nav-item">
                <Link to="/perfil" className="nav-link text-white">Perfil</Link>
              </li>
              <li className="nav-item">
                <Link to="/sistema" className="nav-link text-white">Sistema</Link>
              </li>*/}
            </>
          )}

          {/* Condición para Cliente */}
          {clientType === 'cliente' && (
            <>
              <li className="nav-item">
                <Link to="/home" className="nav-link text-white">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/pedidos" className="nav-link text-white">Pedidos</Link>
              </li>
              <li className="nav-item">
                <Link to="/cargar-pedidos" className="nav-link text-white">Cargar Pedidos</Link>
              </li>
            </>
          )}

          {/* Condición para Auditor */}
          {clientType === 'auditor' && (
            <>
              <li className="nav-item">
                <Link to="/home" className="nav-link text-white">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/pedidos" className="nav-link text-white">Pedidos</Link>
              </li>
            </>
          )}

          {/* Botón de Cerrar Sesión */}
          {clientType && (
            <li className="nav-item mt-auto">
              <button style={{ textAlign: 'left' }} className="btn text-white w-100" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="content p-4" style={{ flex: 1 }}>
        {/* Aquí se renderizará el contenido de las otras páginas */}
      </div>
    </div>
  );
};

export default Sidebar;

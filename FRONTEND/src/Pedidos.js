// Pedidos.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Card from './Components/card';
import logo_pedidos from './images/pedidos.png';  // Asegúrate de usar la ruta correcta
import logo_crear from './images/crear_pedido.jpg';  // Asegúrate de usar la ruta correcta

function Pedidos() {

    const [clientType, setClientType] = useState(localStorage.getItem('clientType'))
    const [user, setUser] = useState(localStorage.getItem('clientName'))

    useEffect(() => {
        // Obtener el tipo de cliente desde localStorage
        const storedClientType = localStorage.getItem('clientType');
        setClientType(storedClientType || ''); // Si no hay tipo, se asigna vacío
    }, []);


    const navigate = useNavigate();  // Usamos `useNavigate` para redirigir a otra página

    // Función para cerrar sesión
    const handleLogout = () => {
        // Limpiar el localStorage (puedes eliminar más datos si es necesario)
        localStorage.removeItem('clientType');

        // Limpiar localStorage
        localStorage.clear();

        // Redirigir al usuario a la página de login
        navigate('/login');
    };

    return (
        <>
            <button style={{ textAlign: 'left', marginLeft: '10px', marginTop: '10px' }} className="btn btn-primary" onClick={handleLogout}>
                Cerrar sesión
            </button>
            <h5 style={{ textAlign: 'left', marginLeft: '10px' }}>Usuario: {user}</h5>
            <h5 style={{ textAlign: 'left', marginLeft: '10px' }}>Tipo Usuario: {clientType}</h5>
            <div className="container mt-5">
                {/*<Sidebar></Sidebar>*/}
                <h1>Pedidos</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Card
                        title="Ver Pedidos"
                        desc="Aquí podrás ver todos los pedidos realizados."
                        name="Ver Pedidos"
                        color="btn btn-outline-primary"
                        //url="https://pedidos.albertus.com.ar/verpedidos"
                        url="/verpedidos"
                        img={logo_pedidos}>
                    </Card>
                    <Card
                        title="Carga tus pedidos"
                        desc="Aqui podras cargar tus pedidos"
                        name="Cargar Pedidos"
                        color="btn btn-outline-success"
                        //url="https://pedidos.albertus.com.ar/cargarpedidos"
                        url="/cargarpedidos"
                        img={logo_crear}>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Pedidos;

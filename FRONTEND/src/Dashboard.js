import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const Dashboard = () => {
    const [clientType, setClientType] = useState('');

    useEffect(() => {
        // Obtener el tipo de cliente desde localStorage
        const storedClientType = localStorage.getItem('clientType');
        setClientType(storedClientType || ''); // Si no hay tipo, se asigna vacío
    }, []);

    //<p>Bienvenido, Administrador. Aquí puedes gestionar todos los usuarios y configuraciones del sistema.</p>

    const renderContent = () => {
        switch (clientType) {
            case 'administrador':
                return <>
                    <Sidebar></Sidebar>
                    <h1>DASHBOARD</h1>
                </>;
            case 'auditor':
                return <>
                    <Sidebar>
                    </Sidebar>
                    <div
                        style={{
                            marginLeft: '250px',
                            padding: '20px'
                        }}
                    >
                        <h1>DASHBOARD</h1>
                    </div>
                </>;
            case 'operador':
                return <Sidebar></Sidebar>;
            case 'cliente':
                return <Sidebar></Sidebar>;
            case 'sucursal':
                return <Sidebar></Sidebar>;
            default:
                return <p>Por favor, inicie sesión para ver su Dashboard.</p>;
        }
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
};

export default Dashboard;

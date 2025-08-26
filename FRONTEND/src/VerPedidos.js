import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Tabla from './Components/tabla';
import Selectpedido from './Components/selectpedido';
import SelectLista from './Components/selectLista';
import ResponsiveTable from './Components/ResponsiveTable';
import TipoPedido from './Components/selectpedido';
import axios from 'axios';

const VerPedidos = () => {

    {/* FECHA | HORA | TIPO | TOTAL | ESTADO | USUARIO*/ }

    const [idSuc, setIdSuc] = useState(localStorage.getItem('idsuc1')); 
    const [usuario, setUsuario] = useState(localStorage.getItem('idUser'));

    const [tipoPedido, setTipoPedido] = useState('');
    const [pedidosList, setPedidosList] = useState([]);

    const handleChange = async (event) => {

        const tipoPedido = event.target.value
        
        //setTipoPedido(value);
        //listPedidos()

        try {

            const response = await axios.post('http://localhost:5000/pedidos/verpedidos', {
                tipo_pedido: tipoPedido,
                idusua: usuario,
                idsuc: idSuc
            });

            setPedidosList(response.data)

        } catch (error) {
            if (error.response) {
                // Error del servidor (por ejemplo, 401 Unauthorized)
                console.error('Error en la respuesta:', error.response.data);
            } else if (error.request) {
                // No hubo respuesta del servidor
                console.error('No se recibió respuesta del servidor:', error.request);
            } else {
                // Otro tipo de error
                console.error('Error al configurar la solicitud:', error.message);
            }
            throw error;
        }

    };

    return (
        <>
            <button href="/pedidos" type="button" class="btn btn-primary" style={{ marginLeft: '10px', marginTop: '5px' }}>
                <a href="/pedidos" style={{ textDecoration: 'none', color: 'white' }}>Volver</a></button>
            <div className="container mt-5" style={{
                border: 'solid',
                borderColor: 'black',
                borderRadius: '5px',
                padding: '8px',
                borderWidth: '1px'
            }}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">VER PEDIDOS</h5>
                        <p className="card-text">Aquí podrás ver todos los pedidos realizados. Puedes gestionar y revisar cada uno de ellos desde esta sección.</p>
                    </div>
                </div>
                <Selectpedido tipoPedido={tipoPedido} handleChange={handleChange} />
                <ResponsiveTable data={pedidosList} tipoPedido={tipoPedido} />
            </div>
        </>
    );
}

export default VerPedidos;

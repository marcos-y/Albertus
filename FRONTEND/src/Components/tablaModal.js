import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import icon from '../images/trash.png'
import QuantityForm from './quantityForm';
import './ResponsiveTable.css'; // Importa los estilos

// Componente Tabla
const Tabla = ({ datos }) => {
    return (
        //tabla detalle
        <div className="container mt-4" style= {{overflowX: 'auto'}}>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Artículo</th>
                        <th>Artículo Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Subtotal</th>
                        {/*<th className="desktop-only" scope="col">Subtotal</th>*/}
                    </tr>
                </thead>
                <tbody>
                    {datos.map((fila, index) => (
                        <tr key={index}>
                            <td>{fila.idprod}</td>
                            <td>{fila.art}</td>
                            <td>{fila.artDes}</td>
                            <td>{fila.cantidad}</td>
                            <td>${fila.precio}</td>
                            <td>${fila.subtotal}</td>
                            {/*<td className="desktop-only">{fila.subtotal}</td>*/}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Componente principal donde se pasa la data
const App = (data) => {
    return <Tabla datos={data.items} />;
};

export default App;

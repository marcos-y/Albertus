import React, { useState } from 'react';
import button_img from '../images/boton.png';
import TablaModal from './tablaModal';
import './ResponsiveTable.css'; // Importa los estilos

const Tabla = () => {
    // Datos de ejemplo
    const data = [
        {
            nroPedido: 1,
            ingreso: '2025-03-23 14:30',
            horaEnvio: '15:00',
            enEspera: '0:30',
            total: '$250',
            cliente: 'Juan Pérez',
            direccionCliente: 'Av. Libertador 1234, CABA',
            retiraSucursal: 'No',
            sucursalPedido: 'Sucursal A',
            estadoActual: 'En proceso',
            impreso: 'Sí',
            tipoPedido: 'INVENTARIO',
            detalle: 'C/D',
            items: [{ cantidad: '2', codigo: 'ABC123', articulo: 'Artículo 1', aclaraciones: 'Entrega el 3 de abril', precioUnitario: '$50.00', subtotal: '$100.00' },
            { cantidad: '1', codigo: 'DEF456', articulo: 'Artículo 2', aclaraciones: 'En espera de confirmación	', precioUnitario: '$75.00', subtotal: '$75.00' },
            { cantidad: '3', codigo: 'XYZ789', articulo: 'Artículo 3', aclaraciones: 'Urgente', precioUnitario: '$40.00', subtotal: '$120.00' }]
        },
        {
            nroPedido: 2,
            ingreso: '2025-03-23 16:10',
            horaEnvio: '16:45',
            enEspera: '0:35',
            total: '$320',
            cliente: 'María López',
            direccionCliente: 'Calle Falsa 456, Buenos Aires',
            retiraSucursal: 'Sí',
            sucursalPedido: 'Sucursal B',
            estadoActual: 'Enviado',
            impreso: 'No',
            tipoPedido: 'INVENTARIO',
            detalle: 'C/D',
            items: [{ cantidad: '2', codigo: 'ABC123', articulo: 'Artículo 1', aclaraciones: 'Entrega el 3 de abril', precioUnitario: '$50.00', subtotal: '$100.00' },
            { cantidad: '1', codigo: 'DEF456', articulo: 'Artículo 2', aclaraciones: 'En espera de confirmación	', precioUnitario: '$75.00', subtotal: '$75.00' },
            { cantidad: '3', codigo: 'XYZ789', articulo: 'Artículo 3', aclaraciones: 'Urgente', precioUnitario: '$40.00', subtotal: '$120.00' }]
        },
        // Agrega más filas si lo necesitas
        {
            nroPedido: 3,
            ingreso: '2025-03-23 14:30',
            horaEnvio: '15:00',
            enEspera: '0:30',
            total: '$250',
            cliente: 'Juan Pérez',
            direccionCliente: 'Av. Libertador 1234, CABA',
            retiraSucursal: 'No',
            sucursalPedido: 'Sucursal A',
            estadoActual: 'En proceso',
            impreso: 'Sí',
            tipoPedido: 'PEDIDO',
            detalle: 'C/D',
            items: [{ cantidad: '2', codigo: 'ABC123', articulo: 'Artículo 1', aclaraciones: 'Entrega el 20 de abril', precioUnitario: '$50.00', subtotal: '$100.00' },
            { cantidad: '1', codigo: 'DEZ456', articulo: 'Artículo 2', aclaraciones: 'En espera de confirmación	', precioUnitario: '$75.00', subtotal: '$75.00' },
            { cantidad: '3', codigo: 'ZZ789', articulo: 'Artículo 3', aclaraciones: 'Urgente', precioUnitario: '$40.00', subtotal: '$120.00' }]
        },
        {
            nroPedido: 4,
            ingreso: '2025-03-23 16:10',
            horaEnvio: '16:45',
            enEspera: '0:35',
            total: '$320',
            cliente: 'María López',
            direccionCliente: 'Calle Falsa 456, Buenos Aires',
            retiraSucursal: 'Sí',
            sucursalPedido: 'Sucursal B',
            estadoActual: 'Enviado',
            impreso: 'No',
            detalle: 'C/D',
            tipoPedido: 'PEDIDO',
            items: [{ cantidad: '2', codigo: 'ABC123', articulo: 'Artículo 1', aclaraciones: 'Entrega el 3 de abril', precioUnitario: '$50.00', subtotal: '$100.00' },
            { cantidad: '1', codigo: 'DEF456', articulo: 'Artículo 2', aclaraciones: 'En espera de confirmación	', precioUnitario: '$75.00', subtotal: '$75.00' },
            { cantidad: '3', codigo: 'XYZ789', articulo: 'Artículo 3', aclaraciones: 'Urgente', precioUnitario: '$40.00', subtotal: '$120.00' }]
        },
        {
            nroPedido: 5,
            ingreso: '2025-03-23 14:30',
            horaEnvio: '15:00',
            enEspera: '0:30',
            total: '$250',
            cliente: 'Juan Pérez',
            direccionCliente: 'Av. Libertador 1234, CABA',
            retiraSucursal: 'No',
            sucursalPedido: 'Sucursal A',
            estadoActual: 'En proceso',
            impreso: 'Sí',
            tipoPedido: 'PEDIDO',
            items: [{ cantidad: '2', codigo: 'ABC123', articulo: 'Artículo 1', aclaraciones: 'Entrega el 3 de abril', precioUnitario: '$50.00', subtotal: '$100.00' },
            { cantidad: '1', codigo: 'DEF456', articulo: 'Artículo 2', aclaraciones: 'En espera de confirmación	', precioUnitario: '$75.00', subtotal: '$75.00' },
            { cantidad: '3', codigo: 'XYZ789', articulo: 'Artículo 3', aclaraciones: 'Urgente', precioUnitario: '$40.00', subtotal: '$120.00' }]
        },
        {
            nroPedido: 6,
            ingreso: '2025-03-23 16:10',
            horaEnvio: '16:45',
            enEspera: '0:35',
            total: '$320',
            cliente: 'María López',
            direccionCliente: 'Calle Falsa 456, Buenos Aires',
            retiraSucursal: 'Sí',
            sucursalPedido: 'Sucursal B',
            estadoActual: 'Enviado',
            impreso: 'No',
            tipoPedido: 'INVENTARIO',
            detalle: 'C/D',
            items: [{ cantidad: '2', codigo: 'ABC123', articulo: 'Artículo 1', aclaraciones: 'Entrega el 3 de abril', precioUnitario: '$50.00', subtotal: '$100.00' },
            { cantidad: '1', codigo: 'DEF456', articulo: 'Artículo 2', aclaraciones: 'En espera de confirmación	', precioUnitario: '$75.00', subtotal: '$75.00' },
            { cantidad: '3', codigo: 'XYZ789', articulo: 'Artículo 3', aclaraciones: 'Urgente', precioUnitario: '$40.00', subtotal: '$120.00' }]
        },
        {
            nroPedido: 7,
            ingreso: '2025-03-23 16:10',
            horaEnvio: '16:45',
            enEspera: '0:35',
            total: '$320',
            cliente: 'María López',
            direccionCliente: 'Calle Falsa 456, Buenos Aires',
            retiraSucursal: 'Sí',
            sucursalPedido: 'Sucursal B',
            estadoActual: 'Enviado',
            impreso: 'No',
            tipoPedido: 'DEVOLUCION',
            items: [{ cantidad: '2', codigo: 'ABC123', articulo: 'Artículo 1', aclaraciones: 'Entrega el 3 de abril', precioUnitario: '$50.00', subtotal: '$100.00' },
            { cantidad: '1', codigo: 'DEF456', articulo: 'Artículo 2', aclaraciones: 'En espera de confirmación	', precioUnitario: '$75.00', subtotal: '$75.00' },
            { cantidad: '3', codigo: 'XYZ789', articulo: 'Artículo 3', aclaraciones: 'Urgente', precioUnitario: '$40.00', subtotal: '$120.00' }]
        },
        {
            nroPedido: 8,
            ingreso: '2025-03-23 16:10',
            horaEnvio: '16:45',
            enEspera: '0:35',
            total: '$320',
            cliente: 'María López',
            direccionCliente: 'Calle Falsa 456, Buenos Aires',
            retiraSucursal: 'Sí',
            sucursalPedido: 'Sucursal B',
            estadoActual: 'Enviado',
            impreso: 'No',
            tipoPedido: 'DEVOLUCION',
            detalle: 'C/D',
            items: [{ cantidad: '2', codigo: 'ABC123', articulo: 'Artículo 1', aclaraciones: 'Entrega el 3 de abril', precioUnitario: '$50.00', subtotal: '$100.00' },
            { cantidad: '1', codigo: 'DEF456', articulo: 'Artículo 2', aclaraciones: 'En espera de confirmación	', precioUnitario: '$75.00', subtotal: '$75.00' },
            { cantidad: '3', codigo: 'XYZ789', articulo: 'Artículo 3', aclaraciones: 'Urgente', precioUnitario: '$40.00', subtotal: '$120.00' }]
        },
        {
            nroPedido: 9,
            ingreso: '2025-03-23 16:10',
            horaEnvio: '16:45',
            enEspera: '0:35',
            total: '$320',
            cliente: 'María López',
            direccionCliente: 'Calle Falsa 456, Buenos Aires',
            retiraSucursal: 'Sí',
            sucursalPedido: 'Sucursal B',
            estadoActual: 'Enviado',
            impreso: 'No',
            tipoPedido: 'INVENTARIO',
            detalle: 'C/D',
            items: [{ cantidad: '2', codigo: 'ABC123', articulo: 'Artículo 1', aclaraciones: 'Entrega el 3 de abril', precioUnitario: '$50.00', subtotal: '$100.00' },
            { cantidad: '1', codigo: 'DEF456', articulo: 'Artículo 2', aclaraciones: 'En espera de confirmación	', precioUnitario: '$75.00', subtotal: '$75.00' },
            { cantidad: '3', codigo: 'XYZ789', articulo: 'Artículo 3', aclaraciones: 'Urgente', precioUnitario: '$40.00', subtotal: '$120.00' }]
        },
        {
            nroPedido: 10,
            ingreso: '2025-03-23 16:10',
            horaEnvio: '16:45',
            enEspera: '0:35',
            total: '$320',
            cliente: 'María López',
            direccionCliente: 'Calle Falsa 456, Buenos Aires',
            retiraSucursal: 'Sí',
            sucursalPedido: 'Sucursal B',
            estadoActual: 'Enviado',
            impreso: 'No',
            tipoPedido: 'NOTA DE CREDITO',
            detalle: 'S/D',
            items: [{ cantidad: '2', codigo: 'ABC123', articulo: 'Artículo 1', aclaraciones: 'Entrega el 3 de abril', precioUnitario: '$50.00', subtotal: '$100.00' },
            { cantidad: '1', codigo: 'DEF456', articulo: 'Artículo 2', aclaraciones: 'En espera de confirmación	', precioUnitario: '$75.00', subtotal: '$75.00' },
            { cantidad: '3', codigo: 'XYZ789', articulo: 'Artículo 3', aclaraciones: 'Urgente', precioUnitario: '$40.00', subtotal: '$120.00' }]
        }
    ];


    const [showModal, setShowModal] = useState(false); // Controlar si el modal se muestra o no
    const [selectedProduct, setSelectedProduct] = useState([]); // Producto seleccionado para mostrar en el modal

    // Función para manejar el clic en el botón de la imagen
    const handleButtonClick = (pedido) => {
        setSelectedProduct(pedido); // Guardamos el producto seleccionado
        console.log(pedido)
        setShowModal(true); // Mostramos el modal
    };

    // Función para cerrar el modal
    const handleCloseModal = () => setShowModal(false);

    const [categorias] = useState(['Categoría 1', 'Categoría 2', 'Categoría 3']);
    const [articulos] = useState(['Artículo 1', 'Artículo 2', 'Artículo 3']);
    const [cantidades] = useState([1, 2, 3, 4, 5]);

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [articuloSeleccionado, setArticuloSeleccionado] = useState('');
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState('');

    // Funciones para manejar los cambios en los selects
    const handleCategoriaChange = (e) => setCategoriaSeleccionada(e.target.value);
    const handleArticuloChange = (e) => setArticuloSeleccionado(e.target.value);
    const handleCantidadChange = (e) => setCantidadSeleccionada(e.target.value);


    return (
        <>
            <div className="container mt-5">
                <div style={{ maxHeight: '700px', overflowY: 'auto' }}>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Ingreso</th>
                                <th>Hora Envío</th>
                                <th>En Espera (Hora:Min)</th>
                                <th>Total</th>
                                <th>Cliente</th>
                                <th>Dirección Cliente</th>
                                <th>Retira en Sucursal</th>
                                <th>Sucursal del Pedido</th>
                                <th>Estado Actual</th>
                                <th>Impreso</th>
                                <th>Tipo Pedido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.ingreso}</td>
                                    <td>{item.horaEnvio}</td>
                                    <td>{item.enEspera}</td>
                                    <td>{item.total}</td>
                                    <td>{item.cliente}</td>
                                    <td>{item.direccionCliente}</td>
                                    <td>{item.retiraSucursal}</td>
                                    <td>{item.sucursalPedido}</td>
                                    <td style={{backgroundColor: item.estadoActual === 'En proceso' ? '#32cd30' : (item.estadoActual === 'Enviado' ? '#698ecf' : 'none') }}>{item.estadoActual}</td>
                                    <td>{item.impreso}</td>
                                    <td>{item.tipoPedido}
                                        <button onClick={() => handleButtonClick([item.ingreso,
                                        item.horaEnvio,
                                        item.enEspera,
                                        item.total,
                                        item.cliente,
                                        item.direccionCliente,
                                        item.retiraSucursal,
                                        item.sucursalPedido,
                                        item.estadoActual,
                                        item.impreso,
                                        item.tipoPedido,
                                        item.items])}
                                            class="image-button"
                                            style={{ border: 'none', backgroundColor: 'none' }}>
                                            <img src={button_img} alt="Botón" style={{ width: '22px', height: '22px', border: 'none', backgroundColor: 'none' }} />
                                            ver detalle
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal de Bootstrap estándar */}
            {
                showModal && (
                    <div className="modal fade show" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="false" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="productModalLabel">Detalle del Pedido - Cliente: {selectedProduct[4]} </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                                </div>
                                <div className="modal-body">
                                    <div style={{ backgroundColor: '#C5C5C5', borderRadius: '3px', padding: '5px' }}>
                                        <p>Creado: {selectedProduct[0]} - Subtotal: 184150 - Dia de Envío : </p>
                                        <p>Direccion Envío: {selectedProduct[5]} - Detalles S/D</p>
                                        <p>Nombre Cliente 575 SUC. SALTA - Email Cliente: salta8@albertus.com</p>
                                        <p>Estado: {selectedProduct[8]} - Tiempo en estado actual: 06:49 /Horas:Minutos/ - Telefono Cliente: </p>
                                        <p>Tipo de Pago: Efectivo - Estado del Pago</p>
                                        <p>Sucursal actual: ALBERTUS - Enviar Pedido a Sucursal: {selectedProduct[7]}</p>
                                        <p>Encargado: Codigo de Seguridad: ARV382</p>
                                    </div>
                                    <div style={{ backgroundColor: '#C5C5C5', borderRadius: '3px', padding: '5px', marginTop: '5px' }}>
                                        <p>Agregar artículo</p>
                                        <div className="container mt-4">
                                            <form>
                                                {/* Select de Categoría */}
                                                <div className="mb-3">
                                                    <label htmlFor="categoria" className="form-label">Categoría</label>
                                                    <select
                                                        className="form-select"
                                                        id="categoria"
                                                        value={categoriaSeleccionada}
                                                        onChange={handleCategoriaChange}
                                                    >
                                                        <option value="">Seleccione una categoría</option>
                                                        {categorias.map((categoria, index) => (
                                                            <option key={index} value={categoria}>{categoria}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Select de Artículo */}
                                                <div className="mb-3">
                                                    <label htmlFor="articulo" className="form-label">Artículo</label>
                                                    <select
                                                        className="form-select"
                                                        id="articulo"
                                                        value={articuloSeleccionado}
                                                        onChange={handleArticuloChange}
                                                    >
                                                        <option value="">Seleccione un artículo</option>
                                                        {articulos.map((articulo, index) => (
                                                            <option key={index} value={articulo}>{articulo}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Select de Cantidad */}
                                                <div className="mb-3">
                                                    <label htmlFor="cantidad" className="form-label">Cantidad</label>
                                                    <select
                                                        className="form-select"
                                                        id="cantidad"
                                                        value={cantidadSeleccionada}
                                                        onChange={handleCantidadChange}
                                                    >
                                                        <option value="">Seleccione la cantidad</option>
                                                        {cantidades.map((cantidad, index) => (
                                                            <option key={index} value={cantidad}>{cantidad}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-success" style={{ float: 'right', marginTop: '5px', marginBottom: '5px' }}>Agregar</button>
                                    <TablaModal items={selectedProduct[11]} ></TablaModal>
                                </div>
                                <div>
                                    {/*<button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal} style={{ float:'left'}}>Cerrar</button> */}
                                    <div style={{ float: 'left', padding: '10px', display:'flex' }}>
                                        <h5>Retira en Sucursal:</h5>
                                        <button style={{marginLeft:'10px'}} type="button" className="btn btn-danger">No</button>
                                    </div>
                                    <div style={{ padding:'15px'}}>
                                        <h5 style={{ float: 'right' }}>Total a cobrar:$100.000</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
            }
        </>
    );
}
export default Tabla;

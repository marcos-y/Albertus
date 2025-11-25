import React, { useState } from 'react';
import button_img from '../images/boton.png';
import './ResponsiveTable.css'; // Importa los estilos
import TablaModal from './tablaModal';

const ResponsiveTable = (props) => {

    console.log(props.tipoPedido)

    const [showModal, setShowModal] = useState(false); // Controlar si el modal se muestra o no
    const [selectedProduct, setSelectedProduct] = useState([]); // Producto seleccionado items para mostrar en el modal

    // Función para manejar el clic en el botón de la imagen
    const handleButtonClick = (itemsList) => {

        console.log(itemsList)
        setSelectedProduct(itemsList); // Guardamos el producto seleccionado
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
                                {/* FECHA | HORA | TIPO | TOTAL | ESTADO | USUARIO*/}
                                <th>ID</th>
                                <th>FECHA</th>
                                <th>HORA</th>
                                <th>TIPO</th>
                                <th>TOTAL</th>
                                <th>ESTADO</th>
                                <th>USUARIO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.filter(pedido => pedido.idfd === "CABECERA").map((item, index) => (
                            <tr key={index}>
                                <td>{item.idfichas}</td>
                                <td>{item.fecha}</td>
                                <td>{item.hora}</td>
                                <td>{item.tipo}</td>
                                <td>{item.total}</td>
                                <td>{item.estado}</td>
                                <td>{item.usuario}</td>
                                <td>
                                        <button onClick={() => handleButtonClick(props.data.filter(items => ((items.idfichas === item.idfichas) && (items.idfd != 'CABECERA'))))}
                                            className="desktop-only"
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
                                    <h5 style={{ float: 'left'}}>Detalle Pedido</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                                </div>
                                <div className="modal-body">
                                    <TablaModal items={selectedProduct} ></TablaModal>
                                </div>
                                <div>
                                    <div style={{ padding: '15px', marginBottom:'30px' }}>
                                    {props.tipoPedido === 'I' ? null :  <h5 style={{ float: 'right', backgroundColor:'#87CEFA' }}>Total a cobrar: ${selectedProduct[0].total}</h5>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
            }
        </>
    );
};
 
export default ResponsiveTable;

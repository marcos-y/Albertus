import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Selectpedido from './Components/selectpedido';
import SelectLista from './Components/selectLista';
import ProductSearch from './Components/productSearch';
import QuantityForm from './Components/quantityForm';
import icon from './images/trash.png'
import cartIcon from './images/cart_icon.png'

const CargarPedidos = () => {

    const [idSuc, setIdSuc] = useState(localStorage.getItem('idsuc1'));
    const [usuario, setUsuario] = useState(localStorage.getItem('idUser'));

    // Estado para almacenar el tipo de pedido seleccionado
    const [tipoPedido, setTipoPedido] = useState('');

    // Maneja el cambio en el desplegable
    const handleChange = (event) => {
        setTipoPedido(event.target.value);
    };

    // Estado para almacenar el tipo de lista seleccionado
    const [tipoLista, setTipoLista] = useState('');

    // Maneja el cambio en el desplegable
    const handleChangeLista = (event) => {
        setTipoLista(event.target.value);
    };

    const [productsList, setProductsList] = useState([]);

    const handleChangeData = async (event) => {

        try {

            const response = await axios.post('http://localhost:5000/pedidos/products', {
                tipo_lista: tipoLista,
                idusua: usuario,
                //idsuc: idSuc
                idsuc: 28
            });

            console.log(response.data)
            setProductsList(response.data)

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

    useEffect(() => {
        // Esta función se ejecuta cada vez que 'tipoLista' cambia
        // console.log(`El valor cambió: ${tipoLista}`);

        // Aquí puedes llamar cualquier función que quieras
        handleChangeData();

    }, [tipoLista]); // <- dependencia: se ejecuta cuando 'tipoLista' cambia


    // Estado para el texto de búsqueda y las opciones filtradas
    const [searchText, setSearchText] = useState('');

    // Función para manejar el cambio en el campo de texto
    const handleChangeSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchText(query);
    };

    //--quantity INPUT
    const [quantity, setQuantity] = useState(0);

    //--quantity update
    const handleCantidadChange = (id, nuevaCantidad) => {
        const nuevosItems = productsList.map(item =>
            item.articulo === id ? { ...item, cantidad: parseInt(nuevaCantidad) || 0 } : item
        );

        setProductsList(nuevosItems);
    };

    //--products list added
    const [listado, setListado] = useState([]);

    //--add product
    const handleAddProduct = (product) => {

        //veo si ya esta agregado
        const newItems = listado.filter(item => item.articulo === product.articulo);
        console.log(newItems)

        if (newItems.length != 0) {
            alert('Producto ya agregado')
        } else {
            //listado.push(product)
            setListado(prev => [...prev, product]);
        }

    };

    //--delet product
    const handleDeletProduct = (product) => {

        //excluyo ese articulo
        const newItems = listado.filter(item => item.articulo !== product.articulo);

        //actualizo el array
        setListado(newItems)
    };

    //--INSERTAR listado en Backend
    const handleRegister = async (products) => {

        if (products.length === 0) {
            alert('Ingrese al menos un articulo')
        } else {
            //Inserto en Back
            //console.log(products)

            try {

                const response = await axios.post('http://localhost:5000/pedidos/insertPedido', {
                    products: JSON.stringify(products),
                    total: products.reduce((acumulador, item) => acumulador + (item.cantidad * item.precio), 0),
                    idusua: usuario,
                    idsuc: 28,
                    tipoPedido: tipoPedido,
                    estado: 'CREADO'
                });

                console.log(response)

                alert('Pedido Registrado correctamente');

                setListado([]);

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
        }
    };

    return (
        <>
            <button href="/pedidos" type="button" class="btn btn-primary" style={{ marginLeft: '10px', marginTop: '5px' }}>
                <a href="/pedidos" style={{ textDecoration: 'none', color: 'white' }}>Volver</a>
            </button>

            <div className="container mt-5" style={{
                border: 'solid',
                borderColor: 'black',
                borderRadius: '5px',
                padding: '8px',
                borderWidth: '1px'
            }}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">CARGAR PEDIDOS</h5>
                        <p className="card-text">Aquí podrás cargar todos los pedidos.</p>
                    </div>
                </div>

                <Selectpedido
                    handleChange={handleChange}
                    tipoPedido={tipoPedido}>
                </Selectpedido>
                <SelectLista
                    handleChangeLista={handleChangeLista}
                    tipoPedido={tipoPedido}>
                </SelectLista>
                {/*---FILTRAR por COD o DES---*/}
                <ProductSearch
                    handleChangeSearch={handleChangeSearch}
                    searchText={searchText}>
                </ProductSearch>

                <div className="container mt-5">
                    <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descripción</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productsList.filter(item => {
                                        return !searchText
                                            || item.DesCorta.toLowerCase().includes(searchText.toLowerCase())
                                            || item.articulo.toLowerCase().includes(searchText.toLowerCase());
                                    }
                                    ).map((item, index) => (
                                        //productsList.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.articulo}</td>
                                            <td>{item.DesCorta}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="cantidad_001"
                                                    class="form-control"
                                                    //min="0"
                                                    //value={item.cantidad}
                                                    placeholder="0"
                                                    onChange={(e) => handleCantidadChange(item.articulo, e.target.value)}
                                                >
                                                </input>
                                            </td>
                                            <td>
                                                <button
                                                    href="cargar"
                                                    type="button"
                                                    class="btn btn-primary"
                                                    onClick={() => handleAddProduct(item)}
                                                >
                                                    Agregar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px' }}>
                    <h5>Listado</h5>
                    <img
                        alt="Icon"
                        style={{ width: '30px', height: '30px', marginLeft: '5px' }}
                        src={cartIcon}
                    ></img>
                </div>

                <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Cód</th>
                                <th>Descripcion</th>
                                <th>Cant.</th>
                                <th>Precio</th>
                                <th>Subtot</th>
                                {/*<th>Eliminar</th>*/}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listado.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.articulo}</td>
                                        <td>{item.DesCorta}</td>
                                        <td>{item.cantidad}</td>
                                        <td>{item.precio}</td>
                                        <td>{item.cantidad * item.precio}</td>
                                        <td>
                                            <img
                                                alt="Botón"
                                                style={{ cursor: "pointer", width: '50px' }}
                                                src={icon}
                                                onClick={() => handleDeletProduct(item)}
                                            >
                                            </img>
                                        </td>
                                    </tr>))
                            }
                        </tbody>
                    </table>
                </div>

                <h5>Total: ${listado.reduce((acumulador, item) => acumulador + (item.cantidad * item.precio), 0)}</h5>
                <button
                    href="cargar"
                    type="button"
                    class="btn btn-outline-success"
                    style={{ marginTop: '30px' }}
                    onClick={() => handleRegister(listado)}
                >
                    Registrar
                </button>
            </div >
        </>
    );
}

export default CargarPedidos;

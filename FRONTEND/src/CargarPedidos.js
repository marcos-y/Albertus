import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Selectpedido from './Components/selectpedido';
import SelectIdLista from './Components/selectIdLista';
import SelectLista from './Components/selectLista';
import ProductSearch from './Components/productSearch';
import QuantityForm from './Components/quantityForm';
import icon from './images/trash.png';
import cartIcon from './images/cart_icon.png';

const CargarPedidos = () => {

    const [usuario, setUsuario] = useState(localStorage.getItem('idUser'));

    //---- Estado para almacenar el TIPO DE PEDIDO seleccionado ----
    const [tipoPedido, setTipoPedido] = useState('');

    // Maneja el cambio en el desplegable
    const handleChange = (event) => {
        setTipoPedido(event.target.value);
    };

    //---- Estado para almacenar el tipo de LISTA seleccionado ----
    const [tipoLista, setTipoLista] = useState('');


    // Maneja el cambio en el desplegable
    const handleChangeLista = (event) => {
        setTipoLista(event.target.value);
    };

    //---- Estado para almacenar el tipo de ID LISTA y SUC seleccionado ----
    //const [tipoListaId, setTipoListaId] = useState('');
    const [tipoListaId, setTipoListaId] = useState(localStorage.getItem('idlis1'));
    const [idSuc, setIdSuc] = useState(localStorage.getItem('idsuc1'));
    //const [idSuc, setIdSuc] = useState('');

    // Maneja el cambio en el desplegable
    const handleChangeListaId = (event) => {
        //setTipoListaId(event.target.value)

        const [idLis, idSucu] = event.target.value.split('|');
        setTipoListaId(idLis)
        setIdSuc(idSucu)
    };

    //Listado que maneja las cantidades
    const [productsList, setProductsList] = useState([]);

    const navigate = useNavigate();

    const handleRedirect = (url) => {
        // window.location.href = url; // Cambia la URL según tu necesidad
        navigate(url)
    };

    //listar poductos
    const handleChangeData = async (event) => {

        try {
            //const response = await axios.post('https://app.albertus.com.ar/pedidos/products', {
            const response = await axios.post('http://localhost:6003/pedidos/products', {
                tipo_lista: tipoLista,
                idusua: usuario,
                idListaPre: tipoListaId
                //idsuc: 28
            });

            //console.log(response.data)
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

    }, [tipoLista]); // <- dependencia: se ejecuta cuando 'tipoPedido' cambia
    // }, [tipoLista]);  <- dependencia: se ejecuta cuando 'tipoLista' cambia


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

        //Agrego a listado PPAL

    };

    //--products list added
    const [listado, setListado] = useState([]);

    //--add product a lista final
    const handleAddProduct = (product, quantity) => {

        //veo si ya esta agregado
        const newItems = listado.filter(item => item.articulo === product.articulo);
        //console.log(newItems)

        if (newItems.length != 0) {

            // SI YA ESTA AGREGADO MODIFICAR LA CANTIDAD
            //actualizo en LISTADO FINAL a AGREGAR -----------

            if (quantity > 0) {

                const artListado = listado.map(p =>
                    p.articulo === product.articulo ? { ...p, cantidad: quantity } : p
                );

                setListado(artListado);

            } else {

                //1-excluyo ese articulo
                const newItems = listado.filter(item => item.articulo !== product.articulo);

                //2-actualizo el array PPAL
                setListado(newItems)
            }

            //actualizo en PRODUCT LIST ------------------

            const productListado = productsList.map(p =>
                p.articulo === product.articulo ? { ...p, cantidad: quantity } : p
            );

            setProductsList(productListado);

        } else {

            //SI NO ESTA AGREGADO
            //1_tengo que agregar su cantidad al listado definitido a CARGAR

            product.cantidad = quantity

            //2_Agrego al listado definitivo a CARGAR (listado)
            setListado(prev => [...prev, product]);

        }
    };

    //--delet product
    const handleDeletProduct = (product) => {

        //1-excluyo ese articulo
        const newItems = listado.filter(item => item.articulo !== product.articulo);

        //2-actualizo el array PPAL
        setListado(newItems)

        //3- Limpio cantidades (Limpio cantidad de ese producto) array CANT
        const arts = productsList.map(item =>
            item.articulo === product.articulo
                ? { ...item, cantidad: '' }
                : { ...item, cantidad: item.cantidad }
        );
        setProductsList(arts)

        //const nuevosItems = listado.filter(item => item.articulo !== product.articulo);
        //setProductsList(nuevosItems);
    };


    //--INSERTAR listado en Backend
    const handleRegister = async (products) => {

        if (products.length === 0) {
            alert('Ingrese al menos un articulo')
        } else {
            //Inserto en Back
            //console.log(products)

            try {

                //const response = await axios.post('https://app.albertus.com.ar/pedidos/insertPedido', {
                const response = await axios.post('http://localhost:6003/pedidos/insertPedido', {
                    products: JSON.stringify(products),
                    total: products.reduce((acumulador, item) => acumulador + (item.cantidad * item.precio), 0),
                    idusua: usuario,
                    idsuc: idSuc,
                    tipoPedido: tipoPedido,
                    estado: 'CREADO'
                });

                alert('Pedido Registrado correctamente');

                //Limpio listado de productos ya agregados
                setListado([]);

                //Limpio cantidades (Limpio cada cantidad del listado)}
                //const nuevosItems = productsList.map((item = ({ ...item, cantidad: 0 }));
                const nuevosItems = productsList.map((item) => ({
                    ...item,
                    cantidad: ''
                }));
                setProductsList(nuevosItems)


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
            <button onClick={() => handleRedirect('/pedidos')} type="button" class="btn btn-primary" style={{ marginLeft: '10px', marginTop: '5px' }}>
                <a onClick={() => handleRedirect('/pedidos')} style={{ textDecoration: 'none', color: 'white' }}>Volver</a>
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
                {/*<SelectIdLista
                    handleChangeListaId={handleChangeListaId}
                    tipoListaId={tipoListaId}>
                </SelectIdLista>*/}
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
                                        <tr key={index}>
                                            <td>{item.articulo}</td>
                                            <td>{item.DesCorta}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    inputmode="decimal"
                                                    step="any"
                                                    name="cantidad_001"
                                                    class="form-control"
                                                    min="0"
                                                    value={item.cantidad}
                                                    //placeholder={item.cantidad ? item.cantidad : 0}
                                                    //placeholder="0"
                                                    // onChange={(e) => handleCantidadChange(item.articulo, e.target.value)
                                                    onChange={(e) => handleAddProduct(item, e.target.value)
                                                    }
                                                >
                                                </input>
                                            </td>
                                            <td>
                                                {/*
                                                <button
                                                    href="cargar"
                                                    type="button"
                                                    class="btn btn-primary"
                                                    onClick={() => handleAddProduct(item)}
                                                >
                                                    Agregar
                                                </button>
                                                */}
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

               { tipoPedido === 'I' ?  null :<h5>Total: ${listado.reduce((acumulador, item) => acumulador + (item.cantidad * item.precio), 0)}</h5>}
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

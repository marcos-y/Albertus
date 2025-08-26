import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './images/albertus_logo_blanco.jpg';  // Asegúrate de usar la ruta correcta
import login from './images/login.png';
import axios from 'axios';

const Login = ({ onLogin }) => {

    const [username, setUsername] = useState('');   // Estado para el nombre de usuario
    const [password, setPassword] = useState('');   // Estado para la contraseña
    const [clientType, setClientType] = useState('administrador');  // Estado para el tipo de cliente
    const [error, setError] = useState('');        // Estado para el mensaje de error
    const [loginTime, setLoginTime] = useState(null);

    const navigate = useNavigate();  // Hook de React Router para redirigir

    // Credenciales predefinidas para este ejemplo
    const validUsername = 'administrador';
    const validPassword = '1234';

    const handleLogin = () => {
        onLogin(); // Actualiza el estado en App
        navigate('/pedidos');
    };

    const login = async (username, password) => {

        try {

            const response = await axios.post('http://localhost:5000/usuarios/login', {
                usuario: username,
                contra: password,
            });

            console.log(response.data)

            //---------DATOS DE USUARIO EN LA SESION-------------------

            // Almacenar el  ID localStorage
            localStorage.setItem('idUser', response.data[0].iduser);

            // Almacenar el  nombre de cliente en localStorage
            localStorage.setItem('clientName', response.data[0].usuario);

            if (response.data > 0) {

                // Almacenar el  ID localStorage (pueden ser varias sucs en algunos usuarios)
                response.data[0].idsuc != null ? localStorage.setItem('idsuc1', response.data[0].idsuc) : localStorage.setItem('idsuc1', '');
                response.data[0].idlistaprecio != null ? localStorage.setItem('idlis1', response.data[0].idlistaprecio) : localStorage.setItem('idlis1', '');

                response.data[1].idsuc != null ? localStorage.setItem('idsuc2', response.data[1].idsuc) : localStorage.setItem('idsuc2', '');
                response.data[0].idlistaprecio != null ? localStorage.setItem('idlis2', response.data[1].idlistaprecio) : localStorage.setItem('idlis2', '');

                response.data[2].idsuc != null ? localStorage.setItem('idsuc3', response.data[2].idsuc) : localStorage.setItem('idsuc3', '');
                response.data[0].idlistaprecio != null ? localStorage.setItem('idlis3', response.data[2].idlistaprecio) : localStorage.setItem('idlis3', '');

                response.data[3].idsuc != null ? localStorage.setItem('idsuc4', response.data[3].idsuc) : localStorage.setItem('idsuc4', '');
                response.data[0].idlistaprecio != null ? localStorage.setItem('idlis4', response.data[3].idlistaprecio) : localStorage.setItem('idlis4', '');

            }else{
                localStorage.setItem('idsuc1', response.data[0].idsuc)
                localStorage.setItem('idlis1', response.data[0].idlistaprecio)
            }

            // Almacenar el borra_usu localStorage
            localStorage.setItem('borra', response.data[0].borra_usu);

            // Almacenar el tipo cliente localStorage
            localStorage.setItem('clientType', response.data[0].tipo);

            //Almacenar el tipo hacepedido localStorage
            localStorage.setItem('hacePedido', response.data[0].hacepedido);

            //Almacenar el tipo vercc localStorage
            localStorage.setItem('vercc', response.data[0].vercc);

            //horario de login
            const currentTime = new Date().toLocaleString();

            // Guardar en localStorage
            localStorage.setItem('loginTime', currentTime);
            setLoginTime(currentTime);

            setError('');  // Limpiar cualquier error previo
            localStorage.setItem('isAuthenticated', 'true')

            //------------------------------------------------------------

            //navigate('/pedidos');  // Redirigir al usuario a la página de inicio
            handleLogin()

            return response.data;

        } catch (error) {
            if (error.response?.status === 401) {
                setError('Usuario o contraseña incorrectos');
            }
            else if (error.response) {
                // Error del servidor (por ejemplo, 401 Unauthorized)
                console.error('Error en la respuesta:', error.response.data);
            } else if (error.request) {
                // No hubo respuesta del servidor
                console.error('No se recibió respuesta del servidor:', error.request);
            } else {
                // Otro tipo de error
                console.error('Error al configurar la solicitud:', error.message);
            }
            //throw error;
        }
    };


    const handleSubmit = (event) => {

        event.preventDefault();  // Evitar comportamiento predeterminado del formulario

        login(username, password)

    };

    return (
        <div className="container mt-5" >
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{ marginTop: '70px' }}>
                        <div className="card-body">
                            <div className="text-center">
                                <img
                                    src={logo} // URL de la imagen externa
                                    alt="Imagen Externa"
                                    className="img-fluid"
                                />
                            </div>

                            {/* Formulario de login */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Usuario
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}  // Actualiza el estado
                                        placeholder="Ingresa tu usuario"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}  // Actualiza el estado
                                        placeholder="Ingresa tu contraseña"
                                    />
                                </div>
                                {/* Mensaje de error */}
                                {error && <div className="alert alert-danger">{error}</div>}

                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">
                                        Iniciar Sesión
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

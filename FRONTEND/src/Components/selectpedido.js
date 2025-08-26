import React, { useState } from 'react';

const TipoPedido = (props) => {

    const [hoveredOption, setHoveredOption] = useState(null); // Para manejar las opciones sobre las que se pasa el mouse

    // Función para manejar el estilo del hover
    const optionStyle = (index) => ({
        backgroundColor: hoveredOption === index ? '#007bff' : '',
        color: hoveredOption === index ? 'white' : '',
    });

    return (
        <div className="container mt-5">
            <label htmlFor="tipoPedido" className="form-label">
                Seleccione el tipo de pedido:
            </label>
            <select
                id="tipoPedido"
                className="form-select"
                //value={props.tipoPedido}
                onChange={props.handleChange}
            >
                <option value="">Seleccione...</option>
                <option
                    value="P"
                    style={optionStyle(1)}
                    onMouseEnter={() => setHoveredOption(1)}
                    onMouseLeave={() => setHoveredOption(null)}
                >
                    PEDIDO
                </option>
                <option
                    value="D"
                    style={optionStyle(2)}
                    onMouseEnter={() => setHoveredOption(2)}
                    onMouseLeave={() => setHoveredOption(null)}
                >
                    DEVOLUCIÓN
                </option>
                <option
                    value="NC"
                    style={optionStyle(3)}
                    onMouseEnter={() => setHoveredOption(3)}
                    onMouseLeave={() => setHoveredOption(null)}
                >
                    NOTA DE CRÉDITO
                </option>
                <option
                    value="I"
                    style={optionStyle(4)}
                    onMouseEnter={() => setHoveredOption(4)}
                    onMouseLeave={() => setHoveredOption(null)}
                >
                    INVENTARIO
                </option>
            </select>

            {/* Mostrar el tipo de pedido seleccionado 
            {props.tipoPedido && (
                <div className="mt-3">
                    <p>Tipo de pedido seleccionado: <strong>{props.tipoPedido}</strong></p>
                </div>
            )}*/}

        </div>
    );
}

export default TipoPedido;

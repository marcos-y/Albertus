import React, { useState } from 'react';

const SelectLista = (props) => {

    const [hoveredOption, setHoveredOption] = useState(null); // Para manejar las opciones sobre las que se pasa el mouse

    // Estilos básicos
    const selectStyle = {
        fontSize: '16px',
        width: '100%',
        marginBottom: '10px',
    };

    // Función para manejar el estilo del hover
    const optionStyle = (index) => ({
        backgroundColor: hoveredOption === index ? '#007bff' : '',
        color: hoveredOption === index ? 'white' : '',
    });

    // Si el tipoPedido es P entonces solo mostrar 2 LISTAS : MaÑana y PAN
    // Si el tipoPedido es Devolucion, NC o Inventario entonces solo mostrar LISTA TODOS 

    return (
        <div className="container mt-5">
            <label htmlFor="tipoLista" className="form-label">
                Seleccione el tipo de lista:
            </label>
            <select
                id="tipoLista"
                className="form-select"
                //value={props.tipoLista}
                onChange={props.handleChangeLista}
                style={selectStyle}
            >
            <option value="">Seleccione...</option>
            {
            (props.tipoPedido === 'NC' || props.tipoPedido === 'I' || props.tipoPedido === 'D') ?
            <option
                value="TODOS"
                style={optionStyle(1)}
                onMouseEnter={() => setHoveredOption(1)}
                onMouseLeave={() => setHoveredOption(null)}
            >
                Lista Todos
            </option>
            :
            <>
            <option
                value="TURNO MAÑANA"
                style={optionStyle(2)}
                onMouseEnter={() => setHoveredOption(2)}
                onMouseLeave={() => setHoveredOption(null)}
            >
                Lista Mañana
            </option>
            <option
                value="LISTA PAN"
                style={optionStyle(3)}
                onMouseEnter={() => setHoveredOption(3)}
                onMouseLeave={() => setHoveredOption(null)}
            >
                Lista Pan
            </option>
            </>
            }
            </select>
        </div >
    );
}

export default SelectLista;
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

    let idList = []

    const [idLis1, setIdLis1] = useState(localStorage.getItem('idlis1'));
    const [idSuc1, setIdSuc1] = useState(localStorage.getItem('idsuc1'));
    if(idLis1 != 0){
        idList.push({idLis : idLis1, idSuc : idSuc1})
    }

    const [idLis2, setidLis2] = useState(localStorage.getItem('idlis2'));
    const [idSuc2, setIdSuc2] = useState(localStorage.getItem('idsuc2'));
    if(idLis2 != null){
        idList.push({idLis : idLis2, idSuc : idSuc2})
    }

    const [idLis3, setidLis3] = useState(localStorage.getItem('idlis3'));
    const [idSuc3, setIdSuc3] = useState(localStorage.getItem('idsuc3'));
       if(idLis3 != null){
       idList.push({idLis : idLis3, idSuc : idSuc3})
    }

    const [idLis4, setidLis4] = useState(localStorage.getItem('idlis4'));
    const [idSuc4, setIdSuc4] = useState(localStorage.getItem('idsuc4'));
       if(idLis4 != null){
       idList.push({idLis : idLis4, idSuc : idSuc4})
    }

    const [idLis5, setidLis5] = useState(localStorage.getItem('idlis5'));
    const [idSuc5, setIdSuc5] = useState(localStorage.getItem('idsuc5'));
       if(idLis5 != null){
       idList.push({idLis: idLis5, idSuc : idSuc5})
    }

    return (
        <div className="container mt-5">
            <label htmlFor="tipoLista" className="form-label">
                Seleccione el Id de lista:
            </label>
            <select
                id="tipoLista"
                className="form-select"
                onChange={props.handleChangeListaId}
                style={selectStyle}
            >
                <option value="">Seleccione...</option>
                {idList.map((id, index) => (
                    <option
                        key={index}
                        value={id.idLis+'|'+id.idSuc}
                        style={optionStyle(id.idLis)}
                        onMouseEnter={() => setHoveredOption(id.idLis)}
                        onMouseLeave={() => setHoveredOption(null)}
                    >
                        {id.idLis}
                    </option>
                ))}
            </select>
        </div >
    );
}

export default SelectLista;
import React, { useState } from 'react';

const SeleccionarProducto = () => {
    const [productoSeleccionado, setProductoSeleccionado] = useState('');

    const productos = [
        { id: 1, nombre: 'Producto 1' },
        { id: 2, nombre: 'Producto 2' },
        { id: 3, nombre: 'Producto 3' },
        { id: 4, nombre: 'Producto 4' },
        { id: 5, nombre: 'Producto 5' },
    ];

    const handleChange = (event) => {
        setProductoSeleccionado(event.target.value);
    };

    return (
        <div className="container mt-5">
            <label htmlFor="producto" className="form-label">
                Seleccione un producto:
            </label>
            <select
                id="producto"
                className="form-select"
                value={productoSeleccionado}
                onChange={handleChange}
                style={{ padding: '10px', fontSize: '16px', width: '100%' }}
            >
                <option value="">Seleccione...</option>
                {productos.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                        {producto.nombre}
                    </option>
                ))}
            </select>

            {/* Mostrar el producto seleccionado */}
            {productoSeleccionado && (
                <div className="mt-3">
                    <p>Producto seleccionado: <strong>{productos.find(p => p.id === parseInt(productoSeleccionado)).nombre}</strong></p>
                </div>
            )}
        </div>
    );
};

export default SeleccionarProducto;

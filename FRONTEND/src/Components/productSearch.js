import React, { useState } from 'react';

const ProductSearch = (props) => {
  
    return (
        <div className="container mt-4">
            {/* Campo de entrada para buscar productos */}
            <div className="mb-3">
                <label htmlFor="productInput" className="form-label">Ingresa el nombre del producto</label>
                <input
                    type="text"
                    className="form-control"
                    id="productInput"
                    value={props.searchText}
                    onChange={props.handleChangeSearch}
                    placeholder="Buscar por código o descripción"
                />
            </div>
        </div>
    );
};

export default ProductSearch;

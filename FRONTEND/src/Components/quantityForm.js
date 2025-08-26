import React, { useState } from 'react';

const ProductForm = (props) => {

  const [quantity, setQuantity] = useState(''); // Estado para la cantidad
  const [error, setError] = useState(''); // Estado para el error

  // Función para manejar el cambio en la cantidad
  const handleQuantityChange = (event) => {
    const input = event.target.value;
    setQuantity(input);
    setError(''); // Limpiar error si el usuario cambia el valor
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar que la cantidad sea mayor que 0
    if (quantity <= 0 || quantity === '') {
      setError('La cantidad debe ser mayor que cero.');
      return;
    }

    // Si la cantidad es válida, mostrar el valor en la consola
    console.log('Cantidad ingresada:', quantity);

    // Limpiar el formulario
    setQuantity('');
  };

  return (
    <div className="container mt-4">
      {/* Formulario para ingresar la cantidad */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          {props.isTable ? <label htmlFor="quantityInput" className="form-label">Cantidad</label> : ''}
          <input
            type="number"
            className="form-control"
            id="quantityInput"
            value={quantity}
            onChange={handleQuantityChange}
            min="1" // Aseguramos que la cantidad mínima sea 1
            placeholder={props.isTable ? "Ingresa la cantidad" : props.quantity}
          />
        </div>

        {/* Mostrar el error si la cantidad no es válida */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Botón de enviar */}
       {/* <button type="submit" className="btn btn-primary">Enviar</button>*/}
      </form>
    </div>
  );
};

export default ProductForm;

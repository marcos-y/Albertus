import React from 'react';

const Card = (props) => {

    const handleRedirect = (url) => {
        window.location.href = url; // Cambia la URL según tu necesidad
    };

    return (
        <div className="col-md-4" style={{marginLeft: '10px',padding:'10px'}}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.desc}</p>
                    <img
                        src={props.img} // URL de la imagen externa
                        alt="Imagen Externa"
                        className="img-fluid"
                    />
                    <button onClick={()=>handleRedirect(props.url)} href="" type="button" class={props.color}>{props.name}</button>
                </div>
            </div>
        </div>
    );
}

export default Card;

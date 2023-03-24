import React from 'react'
import { Link } from 'react-router-dom'

const IrAlInicio = ({titulo,descripcion}) => {
    return (
        <div className="col-12">
            <h1>{titulo}</h1>
            <p>{descripcion}</p>
            <Link to="/">Ir al inicio</Link>
        </div>
    )
}

export default IrAlInicio
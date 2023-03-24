import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Upps!</span> Página no encontrada</p>
                <p className="lead">
                    La página que estás buscando no existe.
                </p>
                <NavLink to={"/"} className="btn btn-primary">Ir al inicio</NavLink>
            </div>
        </div>
    )
}

export default NotFound
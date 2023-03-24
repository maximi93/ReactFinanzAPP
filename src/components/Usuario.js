import React from 'react'
import { Dispatch } from 'react'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import { useEffect } from 'react'

const Usuario = () => {
    const dispatch = useDispatch();
    const usuario = useRef(null);



    return (

        <div className="form-row">
            <div className="form-group col-md-8 " >
                <label htmlFor="inputUsuarioRegistro">Usuario</label>
                <input type="text" ref={usuario} className="form-control" id="inputUsuarioRegistro" placeholder="Usuario" />
            </div>
        </div>
    )
}

export default Usuario
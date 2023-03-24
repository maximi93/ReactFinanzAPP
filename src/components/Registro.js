import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Ciudades from './Ciudades';
import { useRef } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Departamentos from './Departamentos';
import Spinner from 'react-bootstrap/Spinner';
import { caducarSesion } from '../features/sesionSlice';

const Registro = () => {
  const dispatch = useDispatch();
  const dpto = useSelector(state => state.ciudades.dpto);
  const city = useSelector(state => state.ciudades.ciudadSeleccionada);
  const usuario = useRef(null);
  const pass = useRef(null);

  const [error, setError] = useState(false);


  const [cargando, setCargando] = useState(false);

  let navigate = useNavigate();

  // Realiza el registro
  const realizarRegistro = () => {
    setCargando(true);
    if (validarRegistro()) {
      let objUsuario = {
        "usuario": usuario.current.value,
        "password": pass.current.value,
        "idDepartamento": dpto,
        "idCiudad": city
      }
      console.log(objUsuario);
      let requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objUsuario),
        redirect: 'follow'
      };

      fetch("https://dwallet.develotion.com/usuarios.php", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);

          if (result.codigo === 200) {
            localStorage.setItem("apiKey", result.apiKey);
            localStorage.setItem("idUsuario", result.id);
            dispatch(caducarSesion(false));
            navigate("/");
          } else {
            setError(true);
            setCargando(false);

          }
        })
        .catch(error => console.log('error', error));
    } else {
      setError(true);
      setCargando(false);

    }


  }

  const validarRegistro = () => {
    console.log(usuario.current.value.trim(), pass.current.value.trim(), dpto, city);
    return dpto > 0 && city > 0 && usuario.current.value.length > 5 && pass.current.value.length > 5;
  }


  return (
    <div className="container mt-5">

      <div className='form-row justify-content-center'>

        <div className='col-6 p-3 mt-5'>
          <h1 className="form-group">Registro</h1>

          <div className="form-group" >
            <label htmlFor="inputUsuarioRegistro">Usuario</label>
            <input type="text" ref={usuario} className="form-control" id="inputUsuarioRegistro" placeholder="Usuario" />
          </div>




          <div className="form-group">
            <label htmlFor="inputPasswordRegistro">Password</label>
            <input type="password" ref={pass} className="form-control" id="inputPasswordRegistro" placeholder="Password" />
          </div>





          <div className="form-group">

            <div className='form-row justify-content-start'>


              <Departamentos />

              <Ciudades />

              {error && <div className="alert alert-danger col-md" role="alert" data-aria-autofocus="true">
                Error al ingresar los datos. Verifique
              </div>}


            </div>
            <div>

              <button type="button" className="btn btn-primary mt-4" onClick={realizarRegistro}>
                {cargando ? <Spinner as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true">
                </Spinner> : "Registro"}
              </button>
            </div>

            <hr />

            <Link to="/login">Ir a Login</Link>
          </div>
        </div>

      </div>

    </div>


  )
}

export default Registro




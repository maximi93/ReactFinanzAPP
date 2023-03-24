import {  useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { caducarSesion } from '../features/sesionSlice';


import Spinner from 'react-bootstrap/Spinner';

const Login = () => {

    let navigate = useNavigate();
    let dispatch = useDispatch();

    const sesionCaduco = useSelector(state=>state.sesion.sesionCaduco);

    useEffect(() => {
     sesionCaduco&&setError("La sesión ha caducado");   
    }, [sesionCaduco]);
    

    const [error, setError] = useState(null);

    const [cargando, setCargando] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const isDisabled = !username || !password;

    const realizarLogin = () => {
        setCargando(true);

        let objUsuario = {
            "usuario": username,
            "password": password,
        }


        let requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objUsuario),
            redirect: 'follow'
        };

        fetch("https://dwallet.develotion.com/login.php", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.codigo === 200) {
                    localStorage.setItem("apiKey", result.apiKey);
                    localStorage.setItem("idUsuario", result.id);
                    dispatch(caducarSesion(false));
                    navigate("/");
                } else {
                    setError(result.mensaje);
                    setCargando(false);

                }
            })
            .catch(error => {
                // setError(result.mensaje);
                console.log('error', error);
            });

    }


    return (

        <div className="container mt-5">

            <div className='form-row justify-content-center'>

                <div className='col-6 p-3 mt-5'>


                    <h1 className="form-group ">Login</h1>

                    <div className="form-group " >
                        <label htmlFor="inputEmail4">Usuario</label>
                        <input type="text" className="form-control" id="inputUsuario" placeholder="Usuario" value={username} onChange={handleUsernameChange} />
                    </div>



                    <div className="form-group">
                        <label htmlFor="inputPassword4">Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={password} onChange={handlePasswordChange} />

                        {(error!==null) && <div className="alert alert-danger col-md mt-3" role="alert" data-aria-autofocus="true">
                            {error}
                        </div>}
                        <button type="button" className="btn btn-primary mt-4" onClick={realizarLogin} disabled={isDisabled}>
                            {cargando ? <Spinner as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true">
                            </Spinner> : "Login"}</button>

                        <br />
                        <hr></hr>
                        <Link to="/registro">Ir a Registro</Link>

                    </div>
                </div>

            </div>

        </div>


    )
}

export default Login
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { guardarMovimientos } from "../features/movimientosSlice";
import { guardarRubros } from '../features/rubrosSlice';
import { caducarSesion } from "../features/sesionSlice";

const Dashboard = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(localStorage.getItem("apiKey"));
    if (localStorage.getItem("apiKey") === null) {
      navigate("/login");
    } else {
      cargarMovimientos();
      cargarRubros();
    }

  }, [])



  const idUsuario = localStorage.getItem("idUsuario");

  const cargarMovimientos = () => {
    if (localStorage.getItem("apiKey") === null) {
      navigate("/login");
    } else {

      fetch(`https://dwallet.develotion.com/movimientos.php?idUsuario=${idUsuario}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apiKey': localStorage.getItem("apiKey"),

        }
      })
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.codigo === 401) {
            // alert("Sesion caduco");
            dispatch(caducarSesion(true));
            localStorage.clear();
            navigate("/login");

          } else {
            dispatch(guardarMovimientos(result.movimientos));
          }


        })
        .catch(error => console.log('error', error));

    }


  }


  const cargarRubros = () => {

    fetch("https://dwallet.develotion.com/rubros.php", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apiKey': localStorage.getItem("apiKey"),

      }
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.rubros);
        dispatch(guardarRubros(result.rubros));

      })
      .catch(error => console.log('error', error));




  }

  const cerrarSesion = () => {
    localStorage.clear();
  }


  return (
    <div className="container-fluid">
      <div className="row" id="columna">

        <div className="col-md-2" >
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">Bienvenido</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">

              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/agregargasto" className="nav-link">Agregar gasto<span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link to="/agregaringreso" className="nav-link">Agregar ingreso</Link>
                </li>
                <li className="nav-item">
                  <Link to="/movimientos" className="nav-link">Movimientos</Link>
                </li>
                <li className="nav-item">
                  <Link to="/totales" className="nav-link">Montos totales</Link>
                </li>

                <li className="nav-item">
                  <Link to="/analisis" className="nav-link">Analisis</Link>
                </li>
              </ul>
              <span className="navbar-text">
                <Link to="/login" className="nav-link" onClick={cerrarSesion}>Cerrar Sesion</Link>
              </span>
            </div>
          </nav>
        </div>

        <div className="col-md-10 justify-content-center" id="fondo">
          <Outlet context={[cargarMovimientos, cargarRubros]} />
        </div>
      </div>

    </div>


  )
}

export default Dashboard
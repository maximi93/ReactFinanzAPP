import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Rubros from './Rubros';
import { agregarMovimiento } from '../features/movimientosSlice';
import { seleccionarRubro } from '../features/rubrosSlice';
import MiModal from './MiModal';
import { useOutletContext } from "react-router-dom";
import IrAlInicio from './IrAlInicio';

const AgregarMovimiento = ({ tipo }) => {


  //Errores:
  const [errorUsuario, setErrorUsuario] = useState(false);
  const [errorConcepto, setErrorConcepto] = useState(false);
  const [errorRubro, setErrorRubro] = useState(false);
  const [errorMedio, setErrorMedio] = useState(false);
  const [errorTotal, setErrorTotal] = useState(false);
  const [errorFecha, setErrorFecha] = useState(false);
  const [cargarMovimientos] = useOutletContext();


  const concepto = useRef(null);
  const rubro = useSelector(state => state.rubros.rubro);
  const medio = useRef(null);
  const total = useRef(null);
  const fecha = useRef(null);

  const [exito, setExito] = useState(false);

  const dispatch = useDispatch();


  const idUsuario = localStorage.getItem("idUsuario");


  const existeError = () => {

    if (idUsuario === null) {
      setErrorUsuario(true);
      return true;
    }

    else {
      setErrorUsuario(false);
      if (concepto.current.value === "") {
        setErrorConcepto(true);
        return true;
      } else {
        setErrorConcepto(false);
        if (rubro === "-1" || rubro === null) {
          setErrorRubro(true);
          return true;

        } else {
          setErrorRubro(false);
          if (medio.current.value === "-1") {
            setErrorMedio(true);
            return true;

          } else {
            setErrorMedio(false);

            if (total.current.value === "" || isNaN(total.current.value) || Number(total.current.value) < 0) {
              setErrorTotal(true);
              return true;

            } else {
              setErrorTotal(false);

              if (fecha.current.value === "") {
                setErrorFecha(true);
                return true;

              } else {
                setErrorFecha(false);

                return false;
              }
            }
          }
        }
      }
    }


  }



  const nuevoMovimiento = () => {


    if (!existeError()) {

      let objMovimiento = {
        "idUsuario": idUsuario,
        "concepto": concepto.current.value,
        "categoria": rubro,
        "total": total.current.value,
        "medio": medio.current.value,
        "fecha": fecha.current.value
      }

      let requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apiKey': localStorage.getItem("apiKey"),

        },
        body: JSON.stringify(objMovimiento),
        redirect: 'follow'
      };

      fetch("https://dwallet.develotion.com/movimientos.php", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(objMovimiento);
          console.log(result);
          dispatch(agregarMovimiento(result));
          //limpia el rubro seleccionado
          dispatch(seleccionarRubro(-1));
          cargarMovimientos();
          setExito(true);
          limpiarCampos();


        })
        .catch(error => console.log('error', error));
    }
  }



  const limpiarCampos = () => {
    document.querySelector("#inputConcepto").value = "";
    document.querySelector("#inputRubro").value = "-1";
    document.querySelector("#inputMedio").value = "-1";
    document.querySelector("#inputTotal").value = "";
    document.querySelector("#fecha").value = "";

  }


  const hayError = () => errorUsuario || errorConcepto || errorRubro || errorMedio || errorTotal || errorFecha;





  const mostrarError = () => {
    if (errorConcepto) {
      return "Ingrese Concepto"
    }
    else if (errorUsuario) {
      return "Ingrese Usuario";
    } else if (errorRubro) {
      return "Ingrese Rubro";
    } else if (errorTotal) {
      return "Error al ingresar total";
    } else if (errorFecha) {
      return "Ingrese Fecha";

    } else if (errorMedio) {
      return "Ingrese Medio";

    } else {

      return "";
    }


  }

  const mostrarDatosFormulario = () => {

    return {
      "Concepto": concepto.current.value,
      "Categoria": rubro,
      "Total": `$ ${total.current.value}`,
      "Medio": medio.current.value,
      "Fecha": fecha.current.value
    }



  }



  return (
    <div className="container mt-5 componente">
      <div className='form-row justify-content-center'>
        <div className='form-group col-md-10'>
          <div className='form-row'>


            {tipo === "gasto" ? <IrAlInicio titulo={"Agregar gasto"} descripcion="Formulario para registro de gastos"></IrAlInicio> :

              <IrAlInicio titulo={"Agregar Ingreso"} descripcion="Formulario para registro de ingresos"></IrAlInicio>}


            <div className="form-group col-md-8 mt-4" >
              <label htmlFor="inputConcepto">Concepto</label>
              <input ref={concepto} type="text" className="form-control" id="inputConcepto" placeholder="Concepto" />
            </div>


            <Rubros tipoRubro={tipo} />

            <div className="form-group col-md-8">
              <label htmlFor="inputMedio">Medio de pago</label>
              {tipo === "gasto" ? <select id="inputMedio" className="form-control" ref={medio}>
                <option value={"-1"}>Medio de pago...</option>
                <option value={"Efectivo"}>Efectivo</option>
                <option value={"Debito"}>Debito</option>
                <option value={"Credito"}>Credito</option>
              </select> :

                <select id="inputMedio" className="form-control" ref={medio}>
                  <option value={"-1"}>Medio de pago...</option>
                  <option value={"Efectivo"}>Efectivo</option>
                  <option value={"Banco"}>Banco</option>

                </select>}
            </div>

            <div className="form-group col-md-8 " >

              <label className="sr-only" htmlFor="inputTotal">Total</label>
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">$</div>
                </div>
                <input type="text" className="form-control" id="inputTotal" placeholder="Total" ref={total} />
              </div>


            </div>




            <div className="form-group col-md-8 " >
              <input type="date" id="fecha" name="fecha" ref={fecha}></input>

            </div>

            {(hayError()) && <div className="alert alert-danger col-md-8 p-2" role="alert" data-aria-autofocus="true">
              {mostrarError()}
            </div>
            }

            {exito && !hayError() && <div className="alert alert-success col-md-8 p-2" role="alert" id="movExitoso">
              Movimiento agregado con éxito
            </div>}

            <div className="form-group col-md-8 " >

              <MiModal
                tipoBoton="button"
                title="Agregar Movimiento"
                onSave={nuevoMovimiento}
                error={existeError}
                body="¿Desea agregar el movimiento?"
                setExito={setExito}
                mostrarDatosFormulario={mostrarDatosFormulario}

              />

            </div>

          </div>

        </div>

      </div>

    </div>





  )
}



export default AgregarMovimiento
import { useEffect, useState } from "react";
import Movimiento from "./Movimiento";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import IrAlInicio from "./IrAlInicio";


const Movimientos = () => {

  const movimientos = useSelector(store => store.movimientos.movimientos);
  const [cargarMovimientos] = useOutletContext();

  const [isCheckedGastos, setIsCheckedGastos] = useState(false);
  const [isCheckedIngresos, setIsCheckedIngresos] = useState(false);


  const listarGastos = () => movimientos.filter(mov => mov.categoria > 0 && mov.categoria <= 6);
  const listarIngresos = () => movimientos.filter(mov => mov.categoria >= 7 && mov.categoria <= 12);


  return (

    <div className="container mt-5">
      <div className='form-row justify-content-center'>
        <div className='form-group col-md-10'>
          <div className='form-row'>

            
            <IrAlInicio titulo={"Movimientos"} descripcion="Listado de ingresos y gastos"></IrAlInicio>
            <div className="col mb-4 mt-4">


              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="checkBoxGastos" value="option1" checked={isCheckedGastos} onChange={() => setIsCheckedGastos(!isCheckedGastos)} />
                <label className="form-check-label" htmlFor="checkBoxGastos">Gastos</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" checked={isCheckedIngresos} onChange={() => setIsCheckedIngresos(!isCheckedIngresos)} />
                <label className="form-check-label" htmlFor="inlineCheckbox2">Ingresos</label>
              </div>
            </div>



            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Concepto</th>
                  <th scope="col">Rubro</th>
                  <th scope="col">Medio</th>
                  <th scope="col">Total</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Accion</th>

                </tr>
              </thead>
              <tbody>

                {(!isCheckedGastos && !isCheckedIngresos) || (isCheckedGastos && isCheckedIngresos) ? movimientos.map(mov =>
                  <Movimiento movim={mov} key={mov.id} cargarMovimientos={cargarMovimientos} />) :

                  isCheckedIngresos ? listarIngresos().map(mov =>
                    <Movimiento movim={mov} key={mov.id} cargarMovimientos={cargarMovimientos} />) :

                    listarGastos().map(mov =>
                      <Movimiento movim={mov} key={mov.id} cargarMovimientos={cargarMovimientos} />)

                }

              </tbody>
            </table>

          </div>





        </div>

      </div>

    </div>


  )
}

export default Movimientos


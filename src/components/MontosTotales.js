import { useSelector } from "react-redux"
import IrAlInicio from "./IrAlInicio";
import Tarjeta from "./Tarjeta";

const MontosTotales = () => {
  const movimientos = useSelector(state => state.movimientos.movimientos);

  const gastosTotales = () => {
    let total = 0;
    movimientos.filter(mov => mov.categoria <= 6).map(gasto => total += gasto.total);
    return total;
  }

  const ingresosTotales = () => {
    let total = 0;
    movimientos.filter(mov => mov.categoria >= 7).map(ingreso => total += ingreso.total);
    return total;
  }



  return (

    <div className="container mt-5">

      <IrAlInicio titulo={"Montos Totales"} descripcion="Resumen de gastos e ingresos"></IrAlInicio>
      <hr></hr>
      <Tarjeta tipo="danger" header="Gastos:" title="Total de gastos" body={`$ ${gastosTotales()}`}>

      </Tarjeta>

      <Tarjeta tipo="primary" header="Ingresos:" title="Total de ingresos" body={`$ ${ingresosTotales()}`}>

      </Tarjeta>


      {ingresosTotales() - gastosTotales() < 0 ?
        <Tarjeta tipo="danger" header="Saldo Final:" title="Resultado" body={`$ ${ingresosTotales() - gastosTotales()}`}>

        </Tarjeta>

        :

        <Tarjeta tipo="success" header="Saldo Final:" title="Resultado" body={`$ ${ingresosTotales() - gastosTotales()}`}>

        </Tarjeta>
      }

    </div>

  )
}

export default MontosTotales;
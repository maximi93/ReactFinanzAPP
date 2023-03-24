import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { seleccionarRubro } from '../features/rubrosSlice';
import GraficoBarras from "./GraficoBarras";
import GraficoLineas from "./GraficoLineas";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import IrAlInicio from "./IrAlInicio";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Analisis = () => {
  const dispatch = useDispatch();

  const movimientos = useSelector(store => store.movimientos.movimientos);
  const listarGastos = () => movimientos.filter(mov => mov.categoria > 0 && mov.categoria <= 6);
  const listarIngresos = () => movimientos.filter(mov => mov.categoria >= 7 && mov.categoria <= 12);

  const rubros = useSelector(state => state.rubros.rubros);
  const rubroElegido = useRef(null);


  const seleccionarRubroHandler = () => {
    dispatch(seleccionarRubro(rubroElegido.current.value))
    console.log(rubroElegido.current.value);
    console.log(gastos);
    setMensajeAnalisis(compararGastosPorRubro(rubroElegido.current.value));
  }

  const [gastos, setGastos] = useState([]);
  const [ingresos, setIngresos] = useState([]);

  const [totalGM2023, setTotalGM2023] = useState([]);
  const [totalGM2022, setTotalGM2022] = useState([]);

  const [mensajeAnalisis, setMensajeAnalisis] = useState([]);

  const obtenerRubro = (idRubro) => {

    switch (idRubro) {
      case 1:
        return "Alimentación";
      case 2:
        return "Combustible";
      case 3:
        return "Educación";
      case 4:
        return "Paseos";
      case 5:
        return "Alquiler";
      case 6:
        return "Otros";
      case 7:
        return "Aguinaldo";
      case 8:
        return "Sueldo";
      case 9:
        return "Honorarios";
      case 10:
        return "Salario Vacacional";
      case 11:
        return "Rentas";
      case 12:
        return "Otros";


      default:
        break;
    }
  };


  const totalGastosPorMes = (gastos) => {
    if (gastos) {

      const montoTotalPorMes = gastos.reduce((acc, gasto) => {
        const { fecha, total } = gasto;
        const [year, month] = fecha.split('-');
        const mesIndex = parseInt(month) - 1;
        const yearIndex = year === '2023' ? 0 : 1;
        acc[yearIndex][mesIndex].Total += total;
        return acc;
      }, [
        [
          { Mes: 'Enero', Total: 0 },
          { Mes: 'Febrero', Total: 0 },
          { Mes: 'Marzo', Total: 0 },
          { Mes: 'Abril', Total: 0 },
          { Mes: 'Mayo', Total: 0 },
          { Mes: 'Junio', Total: 0 },
          { Mes: 'Julio', Total: 0 },
          { Mes: 'Agosto', Total: 0 },
          { Mes: 'Setiembre', Total: 0 },
          { Mes: 'Octubre', Total: 0 },
          { Mes: 'Noviembre', Total: 0 },
          { Mes: 'Diciembre', Total: 0 },
        ],
        [
          { Mes: 'Enero', Total: 0 },
          { Mes: 'Febrero', Total: 0 },
          { Mes: 'Marzo', Total: 0 },
          { Mes: 'Abril', Total: 0 },
          { Mes: 'Mayo', Total: 0 },
          { Mes: 'Junio', Total: 0 },
          { Mes: 'Julio', Total: 0 },
          { Mes: 'Agosto', Total: 0 },
          { Mes: 'Setiembre', Total: 0 },
          { Mes: 'Octubre', Total: 0 },
          { Mes: 'Noviembre', Total: 0 },
          { Mes: 'Diciembre', Total: 0 },
        ],
      ]);
      console.log(montoTotalPorMes);
      return montoTotalPorMes;
    }
    return ;
  };

  const compararGastosPorRubro = (rubro) => {

    const rubroInt = parseInt(rubro);
    let mensaje = "";
    if (rubroInt > 0) {
      let gastosDelRubro = [];
      let palabra = "";

      for (const gasto of gastos) {
        if (rubroInt === gasto.categoria) {
          gastosDelRubro.push(gasto);

        }
      }
      if (gastosDelRubro.length > 1) {
        let gastosDelRubroSorted = gastosDelRubro.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        console.log(gastosDelRubroSorted);
        console.log(gastosDelRubroSorted[gastosDelRubroSorted.length - 1].total);
        console.log(gastosDelRubroSorted[gastosDelRubroSorted.length - 2].total);
        let diferenciaMonto = gastosDelRubroSorted[gastosDelRubroSorted.length - 1].total - gastosDelRubroSorted[gastosDelRubroSorted.length - 2].total;
        if (diferenciaMonto < 0) {
          palabra = "menos";
        } else {
          palabra = "más";
        }

        mensaje += `Para el rubro ${obtenerRubro(rubroInt)}, en la última compra has gastado $ ${Math.abs(diferenciaMonto)} pesos ${palabra} que en la penúltima.`;
        console.log(mensaje);
      } else {
        mensaje += "No hay 2 gastos para ese rubro";
      }


    }
    return mensaje;

  };

  useEffect(() => {
    setGastos(listarGastos());
    setIngresos(listarIngresos());
  }, []);

  useEffect(() => {
    if(gastos){

      let montosTotalesPorMes = totalGastosPorMes(gastos);
      console.log(montosTotalesPorMes);
      console.log(montosTotalesPorMes[0]);
      console.log(montosTotalesPorMes[1]);
      setTotalGM2023(montosTotalesPorMes[0]);
      setTotalGM2022(montosTotalesPorMes[1]);
    }
      
      
    }, [gastos]);


  const options3 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gráfico de evolución de gasto',
      },

    },
  };
  const data3 = {

    labels: totalGM2023.map(t => t.Mes),
    datasets: [
      {
        label: 'Monto en pesos 2023',
        data: totalGM2023.map(t => t.Total),
        backgroundColor: 'rgba(255, 26, 104, 0.2)',
        borderColor: 'rgba(255, 26, 104,1)'

      },
      {
        label: 'Monto en pesos 2022',
        data: totalGM2022.map(t => t.Total),
        backgroundColor: 'rgba(44, 230, 104, 0.2)',
        borderColor: 'rgba(44, 230, 104,1)'

      }
    ],
  };



  return (
    <div className="container mt-5" id="analisis">
      <div className='form-row justify-content-center'>
        <div className='form-group col-md-10'>
          <div className='row'>
            {/* Titulo */}
            <IrAlInicio titulo={"Análisis"} descripcion="Gráficas relativas a los movimientos"/>
            {/*---------Gráfico de ingresos por rubro-----*/}
            <GraficoBarras titulo='Gráfico de ingresos por rubro' etiqueta='Monto en pesos' color='rgba(54, 162, 235, 0.2)' montos={ingresos} obtenerRubro={obtenerRubro}/>
            {/*---------------------------------------------*/}
            {/*---------Gráfico de gastos por rubro-----*/}
            <GraficoBarras titulo='Gráfico de gastos por rubro' etiqueta='Monto en pesos' color='rgba(88, 111, 192, 0.2)' montos={gastos} obtenerRubro={obtenerRubro}/>
          </div>
          {/*---------Gráfico de evolución del gasto-----*/}
            <GraficoLineas opciones={options3} datos={data3}/>
          {/*---------------------------------------------*/}

          {/*----------- Desplegable de Rubros------------- */}
          <div className="form-group col-6 grafico">
            <label htmlFor="inputRubro">Comparativo entre últimos dos gastos</label>
            <select id="inputRubro" className="form-control" onChange={seleccionarRubroHandler} ref={rubroElegido}>
              <option key={-1} value={-1}>Seleccione un rubro...</option>
              {rubros.map(rubro => rubro.id <= 6 && <option key={rubro.id} value={rubro.id}>{rubro.nombre}</option>)}
            </select>

            <div className="form-group mt-5" >
              <h1 className="lead">{mensajeAnalisis}</h1>
            </div>

          </div>

          {/*---------------------------------------------*/}


        </div>
      </div>
    </div>

  )

}

export default Analisis
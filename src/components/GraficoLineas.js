import { Line } from 'react-chartjs-2';

const GraficoLineas = ({opciones,datos}) => {
  return (
    <div className="col-6 grafico">
    {<Line options={opciones} data={datos} />}
  </div>
  )
}

export default GraficoLineas
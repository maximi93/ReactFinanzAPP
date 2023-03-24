import { Bar } from 'react-chartjs-2';

const GraficoBarras = ({titulo, etiqueta,color,montos,obtenerRubro}) => {
    return (
        <div className="col-6 grafico">
            <Bar options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: titulo,
                    },
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true,
                        },
                    }
                },
            }} data={{
                labels: montos.map(i => obtenerRubro(i.categoria)),
                datasets: [
                    {
                        label: etiqueta,
                        data: montos.map(i => i.total),
                        backgroundColor: color,
                    }
                ],
            }} />
        </div>
    )
}

export default GraficoBarras
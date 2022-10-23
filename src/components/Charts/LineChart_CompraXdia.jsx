import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
//import faker from 'faker';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

function LineChart_CompraXdia({comprasPorDia}) {
    const LabelS = comprasPorDia?.map(function(e) {
      return e.DIA;
    });

    var DataS = comprasPorDia?.map(function(e) {
      return e.TOTAL_COMPRAS;
    });

    const data = {
        labels: LabelS,
        datasets: [
            {
                label: 'Ventas Diarias',
                data: DataS,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
        ],
    };




    return <Line data={data} />;
}

export default LineChart_CompraXdia




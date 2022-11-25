import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Box, Typography } from '@mui/material';
//import faker from 'faker';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend , ChartDataLabels);

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
    const options = {
      plugins: {
        legend: {
          display: true,
          align: 'end'
         
        },
        datalabels: {
          display: true,
          color: "black",
          align: "end",
          padding: {
            right: 2,
          },
          labels: {
            title: {
              font: {
                weight: "bold"
              }
            },
          },
        }
      }
    };



    return(
      <Box>
      <Typography>Ventas por dia</Typography>
      <Line style={{width: 500}} data={data} options={options} />
    </Box>
    ) ;
}

export default LineChart_CompraXdia




import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
//import faker from 'faker';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

function LineChart_CompraXmes({ comprasPorMes }) {
    const LabelS = comprasPorMes?.map(function(e) {
      return e.MES.trim();
    });

    var DataS = comprasPorMes?.map(function(e) {
      return e.TOTAL_COMPRAS;
    });

    const data = {
        labels: LabelS,
        datasets: [
            {
                label: 'Ventas Mensuales',
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
          align: 'center'
         
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

    return (
      <Box>
        <Typography>Ventas Mensuales</Typography>
        <Line style={{width: 500}} data={data}  options={options}/>
      </Box>
    );
}

export default LineChart_CompraXmes
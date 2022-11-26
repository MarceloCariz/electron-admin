
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart_TipoPago({ estadoPago }) {
  const filtrado = estadoPago?.filter(({ ESTADO_PAGO }) => (ESTADO_PAGO !== null && ESTADO_PAGO));
  const LabelS = filtrado?.map(({ ESTADO_PAGO }) => (ESTADO_PAGO ));
  const DataS = filtrado?.map(({ CANTIDAD }) => (CANTIDAD));
  // console.log(DataS)




  const config = {
    labels: LabelS,
    datasets: [
      {
        label: '# of Votes',
        data: DataS,
        backgroundColor: ['rgba(60, 180, 50, 0.8)', 'rgba(220, 199, 53, 0.8)',
        'rgba(218, 50, 45, 0.8)'],
      },
    ]
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
    <Typography>Tipos de Pago</Typography>
    <Doughnut style={{width: 400}} data={config} options={options} />
  </Box>
  ) ;
}

export default DoughnutChart_TipoPago


import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );


function BarChart_stockProd({stockProductosNombre}) {
  const LabelS = stockProductosNombre?.map(function(e) {
    return e.NOMBRE.toLowerCase();;
  });
  
  var DataS = stockProductosNombre?.map(function(e) {
    return e.TOTAL;
  });

  const data = {
    labels: LabelS,
    datasets: [
      {
        label: 'Stock de productos',
        data: DataS,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
  <Typography>Stock de Productos</Typography>
  <Bar style={{width: 500}} data={data}  options={options} />;
</Box>
  )
}

export default BarChart_stockProd


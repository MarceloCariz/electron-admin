import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Typography } from "@mui/material";


ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart_TipoVenta({ tipoVenta }) {
  const LabelS = tipoVenta?.map(function(e) {
    return e.TIPO_VENTA;
  });
  var DataS = tipoVenta?.map(function(e) {
    return e.CANTIDAD;
  });

  const config = {
    labels: LabelS,
    datasets: [
      {
        label: 'EXAMPLE TITLE',
        data: DataS,
        backgroundColor: [
          'rgba(255, 99, 132, 0.9)',
          'rgba(54, 162, 235, 0.9)',
          'rgba(255, 206, 86, 0.9)',
          'rgba(75, 192, 192, 0.9)',
          'rgba(153, 102, 255, 0.9)',
          'rgba(255, 159, 64, 0.9)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
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
  <div>
    <Typography>Tipos de Ventas</Typography>
    <Pie style={{width: 400}} data={config} options={options} />
  </div>
  );
}

export default PieChart_TipoVenta;


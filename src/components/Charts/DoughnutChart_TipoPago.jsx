
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart_TipoPago({ estadoPago }) {
  const LabelS = estadoPago?.map(function(e) {
    return e.ESTADO_PAGO.toLowerCase();
  });
  const DataS = estadoPago?.map(function(e) {
    return e.CANTIDAD;
  });




  const config = {
    labels: LabelS,
    datasets: [
      {
        label: '# of Votes',
        data: DataS,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
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
    ]
  };

  const options = {
    plugins:{
      datalabels:{
        display: true,
        color: "black",
        align:"end",
        anchor: "end",
        font: { size: "14" }
      }
    },
    legend: {
      display: false
    }
  }
  
  








  return <Doughnut data={config} options={options} />;
}

export default DoughnutChart_TipoPago


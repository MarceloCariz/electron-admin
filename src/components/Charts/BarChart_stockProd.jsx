import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

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

  return <Bar data={data} />;
}

export default BarChart_stockProd


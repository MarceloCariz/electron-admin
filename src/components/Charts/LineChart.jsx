import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function LineChart({ chartData }) {
  return <Line data={chartData} />;
}

export default LineChart;
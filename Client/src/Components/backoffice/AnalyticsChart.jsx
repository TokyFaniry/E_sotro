// src/Components/AnalyticsChart.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2'; 
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); 

const AnalyticsChart = ({ data }) => {
  
  const colors = [
    '#FF6384', 
    '#36A2EB',
    '#FFCE56', 
    '#4BC0C0', 
    '#9966FF', 
    '#FF9F40', 
  ];

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'Ventes',
        data: data.map(item => item.value),
        backgroundColor: data.map((_, index) => colors[index % colors.length]),
        borderColor: 'rgba(255, 255, 255, 1)', 
        borderWidth: 2, 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}`; 
          },
        },
      },
    },
  };

  return (
    <div className="analytics-chart" style={{ width: '1500px', height: '1000px' }}> 
      <h2>Analyse des Ventes</h2>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default AnalyticsChart;

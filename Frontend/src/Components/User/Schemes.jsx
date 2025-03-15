import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Schemes = () => {
  const pieData = {
    labels: ['Mediclaim', 'Accidental', 'Health', 'Student', 'Pension'],
    datasets: [
      {
        label: 'Best Insurance Schemes',
        data: [25, 20, 15, 30, 10], // Example data, replace with actual data
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center border border-gray-200 relative overflow-hidden h-[400px]">
        <h2 className="text-2xl font-bold mb-4">Best Insurance Schemes</h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default Schemes;
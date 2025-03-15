import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

const LineChart = () => {
  // Data for the Line chart
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Example labels, replace with actual data
    datasets: [
      {
        label: 'Portfolio Growth',
        data: [65, 59, 80, 81, 56, 55, 40], // Example data, replace with actual data
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.8)', // Line color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        tension: 0.1
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Portfolio Growth Over Time',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value'
        }
      }
    }
  };

  return (
    <div className="mt-4 bg-white border-2 border-black p-4 rounded-lg shadow-lg" style={{ width: '100%', height: '300px' }}>
      <h3 className="text-lg text-center mb-2">Portfolio Growth Over Time</h3>
      <Line data={lineData} options={lineOptions} />
    </div>
  );
};

export default LineChart;
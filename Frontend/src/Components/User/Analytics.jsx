import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement } from 'chart.js';

// Registering necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement);

const Analytics = () => {
  // Updated data for "up-down-up" pattern in Wasted Food (Line chart)
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // months
    datasets: [
      {
        label: 'Money Earned over time',
        data: [10, 30, 20, 40, 25, 50, 35], // up-down-up pattern
        fill: false,
        borderColor: '#34D399', // Tailwind Green
        tension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: '#34D399',
      },
    ],
  };

  // Function to generate dynamic color for each bar
  const generateDynamicColors = (data) => {
    return data.map((value) => {
      if (value < 10) return '#FF6347'; // Tomato color for low values
      if (value < 15) return '#FFA500'; // Orange for medium-low values
      if (value < 20) return '#FFD700'; // Gold for medium values
      return '#32CD32'; // Lime green for high values
    });
  };

  // Updated data for "up-down-up" pattern in Optimized Food (Bar chart)
  const barData = {
    labels: ['MRF', 'Tata', 'HDFC', 'Reliance', 'ICICI', 'Infosys'], 
    datasets: [
      {
        label: 'Top Growing stocks for you',
        data: [12, 8, 15, 10, 18, 14], // up-down-up pattern
        backgroundColor: generateDynamicColors([12, 8, 15, 10, 18, 14]), // Dynamic colors
        borderColor: generateDynamicColors([12, 8, 15, 10, 18, 14]), // Matching border color
        borderWidth: 1,
      },
    ],
  };

  // Data for the Pie chart
  const pieData = {
    labels: ['Bonds', 'Stocks', 'Insurance'],
    datasets: [
      {
        label: 'Investment Composition',
        data: [30, 50, 20], // Example data, replace with actual data
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)', // Dark Cyan
          'rgba(54, 162, 235, 0.8)', // Dark Blue
          'rgba(255, 99, 132, 0.8)'  // Dark Red
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Options for the charts
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Stock Analytics',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month', // For the Line chart
        },
      },
      y: {
        title: {
          display: true,
          text: 'Money Earned over time', // For the Line chart
        },
        beginAtZero: true,
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Top Growing stocks for you',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Stock Name', // For the Bar chart
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value', // For the Bar chart
        },
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Investment Composition',
      },
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <>
      <div className="flex justify-between space-x-8">
        {/* Separate white container for Line Chart for Wasted Food */}
        <div className="w-1/2 bg-white border-2 border-black p-4 rounded-lg shadow-lg">
          <h3 className="text-lg text-center mb-2">Money Earned over time</h3>
          <Line data={lineData} options={options} />
          {/* Separate white container for Pie Chart for Investment Composition */}
          
        </div>

        {/* Separate white container for Bar Chart for Optimized Food */}
        <div className="w-1/2 bg-white border-2 border-black p-4 rounded-lg shadow-lg">
          <h3 className="text-lg text-center mb-2">Top Growing stocks for you</h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
     
    </>
  );
};

export default Analytics;
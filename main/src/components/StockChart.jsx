// components/StockChart.js
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const StockChart = ({ data }) => {
    if (!data) return null;

    const chartData = {
        labels: data.predicted_values.map((_, index) => `Day ${index}`),
        datasets: [
            {
                label: 'Predicted Stock Values',
                data: data.predicted_values,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => `$${context.raw.toFixed(2)}`,
                },
            },
        },
    };

    return (
        <Line data={chartData} options={options} />
    );
};


export default StockChart;

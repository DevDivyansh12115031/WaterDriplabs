import React from 'react';
import ExcelUpload from './Components/ExcelUpload';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartData {
    x: string;
    y: number;
}

const App: React.FC = () => {
    const [chartData, setChartData] = React.useState<ChartData[]>([]);

    const getChartOptions = () => ({
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: 'Chart' },
        },
    });

    const getChartData = () => ({
        labels: chartData.map((d) => d.x),
        datasets: [
            {
                label: 'Data',
                data: chartData.map((d) => d.y),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
        ],
    });

    return (
        <div>
            <h1>Excel Data to Chart</h1>
            <ExcelUpload setChartData={setChartData} />
            {chartData.length > 0 && (
                <div>
                    <Line data={getChartData()} options={getChartOptions()} />
                </div>
            )}
        </div>
    );
};

export default App;

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartData {
    x: string;
    y: number;
}

interface ExcelUploadProps {
    setChartData: React.Dispatch<React.SetStateAction<ChartData[]>>;
}

const ExcelUpload: React.FC<ExcelUploadProps> = ({ setChartData }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const lines = text.split('\n');
            const header = lines[0].split(',').map(item => item.trim());

            const parsedData: ChartData[] = [];

            lines.slice(1).forEach((line) => {
                const values = line.split(',').map(item => item.trim());
                const dataObject = header.reduce((acc, key, index) => {
                    acc[key] = values[index];
                    return acc;
                }, {} as Record<string, string>);

                const formattedDate = `${dataObject.arrival_date_year}-${dataObject.arrival_date_month}-${dataObject.arrival_date_day_of_month}`;
                const value = parseInt(dataObject.adults) || 0;

                parsedData.push({ x: formattedDate, y: value });
            });

            setChartData(parsedData);
        };
        reader.readAsText(file);
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
    );
};

export default ExcelUpload;


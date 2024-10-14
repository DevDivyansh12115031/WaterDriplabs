
import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; 

interface TimeSeriesChartProps {
    data: { x: Date, y: number }[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
    const options: ApexOptions = { 
        chart: {
            id: 'time-series-chart',
            type: 'line', 
            zoom: {
                enabled: true,
            }
        },
        xaxis: {
            type: 'datetime' as const, 
            labels: {
                format: 'MMM dd'
            }
        },
        tooltip: {
            x: { format: 'dd MMM yyyy' }
        },
    };

    const series = [
        {
            name: 'Visitors',
            data,
        }
    ];

    return (
        <Chart
            options={options}
            series={series}
            type="line" 
            height={350}
        />
    );
};

export default TimeSeriesChart;

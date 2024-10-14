import React from 'react';
import Chart from 'react-apexcharts';

interface ColumnChartProps {
    data: number[];
    categories: string[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data, categories }) => {
    const options = {
        chart: {
            id: 'column-chart',
            toolbar: {
                show: true
            }
        },
        xaxis: {
            categories,
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            bar: {
                columnWidth: '50%'
            }
        }
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
            type="bar"
            height={350}
        />
    );
};

export default ColumnChart;


import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; 

interface SparklineChartProps {
    data: number[];
    type?: string; 
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data }) => {
    
    const series = [{
        name: 'Data',
        data: data, 
    }];

    const options: ApexOptions = { 
        chart: {
            id: 'sparkline-chart', 
            type: 'line', 
            sparkline: {
                enabled: true, 
            },
        },
        stroke: {
            curve: 'smooth', 
            width: 2,
        },
        markers: {
            size: 0, 
        },
        tooltip: {
            enabled: false, 
        },
    };

    return (
        <Chart
            options={options}
            series={series}
            type="line" 
            height={100}
        />
    );
};

export default SparklineChart;

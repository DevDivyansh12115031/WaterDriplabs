import React, { useState, useEffect } from 'react';
import DateSelector from '../Components/DateSelector';

import TimeSeriesChart from '../Components/TimeSeriesChart';

import ColumnChart from '../Components/ColumnChart';

import SparklineChart from '../Components/SparklineChart';
import { BookingData, parseCSV } from '../Data/dataParser';

const Dashboard: React.FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [bookingData, setBookingData] = useState<BookingData[]>([]);

    useEffect(() => {
        fetch('/path/to/hotel_bookings_1000.csv')
            .then(response => response.blob())
            .then(blob => parseCSV(blob))
            .then(data => setBookingData(data))
            .catch(error => console.error("Error loading data:", error));
    }, []);

    const filteredData = bookingData.filter((item) => {
        const itemDate = new Date(`${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`);
        return (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
    });

    const timeSeriesData = filteredData.map(item => ({
        x: new Date(`${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`),
        y: item.adults
    }));

    const columnChartData = filteredData.map(item => item.children);
    const categories = filteredData.map(item => `${item.arrival_date_month}-${item.arrival_date_day_of_month}`);

    const sparklineAdultsData = filteredData.map(item => item.adults);
    const sparklineChildrenData = filteredData.map(item => item.children);

    return (
        <div>
            <DateSelector
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
            <TimeSeriesChart data={timeSeriesData} />
            <ColumnChart data={columnChartData} categories={categories} />
            <SparklineChart data={sparklineAdultsData} type="Adults" />
            <SparklineChart data={sparklineChildrenData} type="Children" />
        </div>
    );
};

export default Dashboard;

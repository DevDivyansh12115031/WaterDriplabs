
export interface BookingData {
    arrival_date_year: string;
    arrival_date_month: string;
    arrival_date_day_of_month: string;
    adults: number;
    children: number;
    
}

export const parseCSV = async (file: Blob): Promise<BookingData[]> => {
    const text = await file.text();
    const rows = text.split('\n');
    const headers = rows[0].split(',');

    return rows.slice(1).map(row => {
        const values = row.split(',');
        const bookingData: any = {};
        headers.forEach((header, index) => {
            bookingData[header] = values[index];
        });
        return bookingData as BookingData;
    });
};

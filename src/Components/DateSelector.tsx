import React from 'react';

interface DateSelectorProps {
    startDate: Date | null;
    endDate: Date | null;
    setStartDate: (date: Date | null) => void;
    setEndDate: (date: Date | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ startDate, endDate, setStartDate, setEndDate }) => {
    return (
        <div>
            <label>
                Start Date:
                <input
                    type="date"
                    value={startDate ? startDate.toISOString().substring(0, 10) : ''}
                    onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                />
            </label>
            <label>
                End Date:
                <input
                    type="date"
                    value={endDate ? endDate.toISOString().substring(0, 10) : ''}
                    onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                />
            </label>
        </div>
    );
};

export default DateSelector;

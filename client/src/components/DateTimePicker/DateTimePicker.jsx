import React, { useState } from "react";

const DateTimePicker = ({
    startDate,
    startTime,
    setStartDate,
    setStartTime,
}) => {
    return (
        <>
            <div>
                <label htmlFor="date-input">Date:</label>
                <input
                    type="date"
                    id="date-input"
                    name="date"
                    min={startDate}
                    value={startDate}
                    placeholder="yyyy-mm-dd"
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="time">Time:</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    value={startTime.toString()}
                    onChange={(e) => {
                        setStartTime(e.target.value);
                        console.log("..", e.target.value);
                    }}
                />
            </div>
        </>
    );
};

export default DateTimePicker;

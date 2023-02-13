import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./DateTimePicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, addMinutes } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

// CSS Modules, react-datepicker-cssmodules.css1
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
// import es from "date-fns/locale/en-IN";
import { parseISO } from "date-fns";

// registerLocale("es", es);

const DateTimePicker = ({ startDate, setStartDate }) => {
    const handleChange = (e) => {
        setStartDate(e);
        console.log(e);
        console.log(
            new Date(
                Date.parse(
                    startDate.toLocaleString("en-US", {
                        timeZone: "Asia/Kolkata",
                    })
                )
            )
        );
    };

    return (
        <>
            <DatePicker
                minDate={new Date()}
                maxDate={addDays(new Date(), 2)}
                showTimeSelect
                selected={startDate}
                timeFormat="p"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                onChange={handleChange}
            />
        </>
    );
};

export default DateTimePicker;

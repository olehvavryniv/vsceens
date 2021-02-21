import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { localizeDayOfWeek } from "../common/helpers";

function DateTime() {
    const [dateTime, setDateTime] = useState(moment());
    useEffect(() => {
        const timer = setInterval(() => { setDateTime(moment()) }, 60000)
        return () => { clearInterval(timer) };
    }, []);
    
    return(
        <div className="date-time-container">
            <div className="time">
                {dateTime.format('HH:mm')}
            </div>
            <div className="date-wrapper">
                <div>{localizeDayOfWeek(dateTime.day())}</div>
                <div>{dateTime.format('DD.MM')}</div>
            </div>
        </div>
    );
}

export default DateTime;
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { monthToString } from '../helpers/dateHelper';

function Header({ screen }) {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => { setTime(dayjs()) }, 60000)
    return () => { clearInterval(timer) };
  }, []);

  return(
      <div className='header'>
        <div className='heading'>
          { screen?.header }
        </div>
            <div className='clock-wrapper'>
              <div className='time'>{ time.format("HH:mm") }</div>
              { screen?.name !== 'calendar_events' && 
                <div className='date'>{ time.date() + ' ' + monthToString(time.month()) }</div>
              }
            </div>
      </div>
  );
}

export default Header;

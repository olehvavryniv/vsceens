import Axios from 'axios';
import { useEffect, useState } from 'react';
import ScheduleItem from './schedule-item';
import urls from '../helpers/urls';

function Schedules(props) {
    const [scheduleNames, setScheduleNames] = useState([]);
    const loadSchedules = async () => {
        const responce = await Axios.get(urls().schedulesInfoUrl);
        setScheduleNames(responce.data.map(schedule => schedule.scheduleName));
    };

    useEffect(() => {
        loadSchedules();
    }, []);

    return (
        <>
            <div className='schedules-wrapper'>
                { scheduleNames.map((schedule, id) => <ScheduleItem scheduleName={schedule} key={id}/>) }
            </div>
        </>
    );
}

export default Schedules;
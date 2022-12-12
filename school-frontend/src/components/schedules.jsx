import Axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import ScheduleItem from './schedule-item';
import urls from '../helpers/urls';
import { splitArray } from '../helpers/arrayHelper';

function Schedules(props) {
    const [scheduleNames, setScheduleNames] = useState([]);
    const [scheduleChunks, setScheduleChunks] = useState([]);
    const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
    const intervalId = useRef(0);

    const loadSchedules = async () => {
        const responce = await Axios.get(urls().schedulesInfoUrl);
        const chanks = splitArray(responce.data, 3)
        setScheduleChunks(chanks);

        intervalId.current = setInterval(() => { changeChunk(chanks.length) }, 10 * 1000);
    };

    useEffect(() => {
        loadSchedules();

        return () => { clearInterval(intervalId.current) };
    }, []);

    const changeChunk = (chanksCount) => {        
        setCurrentChunkIndex((prevIndex) => {
            if (chanksCount === 1) return prevIndex;
            if ((prevIndex + 1) >= chanksCount) return 0;
            return prevIndex + 1;
        });
    };

    if (scheduleChunks.length === 0) {
        return <></>;
    }

    return (
        <>
            <div className='schedules-wrapper'>
                { scheduleChunks[currentChunkIndex].map((schedule, id) => <ScheduleItem scheduleName={schedule.scheduleName} key={id}/>) }
            </div>
        </>
    );
}

export default Schedules;

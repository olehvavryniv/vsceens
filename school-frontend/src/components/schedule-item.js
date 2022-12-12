import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import urls from '../helpers/urls';

function ScheduleItem({ scheduleName }) {
    const [info, setInfo] = useState(null);
    const timerId = useRef(0);
    const timeoutId = useRef(0);
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => { 
        init();

        return cleanup;
    }, []);

    const init = async () => {
        await loadInfo();
        timerId.current = setInterval(() => { processTime() }, 1000);
    };

    const cleanup = () => {
        clearInterval(timerId.current);
        clearTimeout(timeoutId.current);
    };

    const loadInfo = async () => {
        const responce = await Axios.get(urls().schedulesInfoUrl);
        const data = responce.data.find(s => s.scheduleName === scheduleName);
        timeoutId.current = setTimeout(loadInfo, (data.secondsLeft || 5) * 1000);
        setInfo(data);
        setSecondsLeft(data.secondsLeft);
    };

    const processTime = () => {
        setSecondsLeft((prevSeconds) => Math.max(prevSeconds - 1, 0)); 
    }

    const normalizeTime = (time) => {
        return time < 10 ? `0${time}` : time.toString();
    }

    if (info?.notStarted){
        return (
            // <div className='schedule-item'>
            //     <div className='name'>Не розпочато</div>
            // </div>
            <div className='schedule-item'>
                <div className='name'>{ scheduleName }</div>
                <div className='time'>- - : - -</div>
                <div>
                    <div className={ 'dot orange' }></div>
                    <span className='lesson-name'>
                        Завершено
                    </span>
                </div>
            </div>
        );
    } else if (info) {
        const minutes = Math.floor(secondsLeft/60);
        const seconds = secondsLeft - minutes * 60;
        const timeLeft = `${normalizeTime(minutes)}:${normalizeTime(seconds)}`

        return (
            <div className='schedule-item'>
                <div className='name'>{ scheduleName }</div>
                <div className='time'>{ timeLeft }</div>
                <div>
                    <div className={ 'dot ' + (info.isLesson ? 'green' : 'yellow') }></div>
                    <span className='lesson-name'>
                        { info?.lessonName || 'Перерва' }
                    </span>
                </div>
            </div>
        );
    } else {
        return (<></>);
    }
}

export default ScheduleItem;

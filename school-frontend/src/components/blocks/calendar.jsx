import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import weekDayToString from "../../helpers/dateHelper";

function Calendar({data}) {
    const weekInfo = [
        { dayName: '', date: '', events: 0, weekEnd: false, current: true },
        { dayName: '', date: '', events: 0, weekEnd: false, current: false },
        { dayName: '', date: '', events: 0, weekEnd: false, current: false },
        { dayName: '', date: '', events: 0, weekEnd: false, current: false },
        { dayName: '', date: '', events: 0, weekEnd: false, current: false },
        { dayName: '', date: '', events: 0, weekEnd: false, current: false },
        { dayName: '', date: '', events: 0, weekEnd: false, current: false },
        { dayName: '', date: '', events: 0, weekEnd: false, current: false },
        { dayName: '', date: '', events: 0, weekEnd: false, current: false },
    ];
    
    data.forEach((event) => {
        const res = Math.ceil(dayjs(event.date).diff(dayjs(), 'day', true));
        weekInfo[res].events++;
    });

    weekInfo.forEach((day, i) => {
        const dayDate = dayjs().add(i, 'day');
        const dayNumber = dayDate.day();
        day.date = dayDate.date();
        day.dayName = weekDayToString(dayNumber);
        day.weekEnd = dayNumber === 0 || dayNumber === 6;
        day.events = Math.min(day.events, 4);
    })


    
    const events = data.slice(0, 3).map((event) => {
        const eventDate = dayjs(event.date);
        const startTime = dayjs(event.startTime).format('HH:mm');
        const endTime = dayjs(event.endTime).format('HH:mm');
        return {
            date: eventDate.date(),
            name: event.name,
            place: event.place,
            time: startTime + '-' + endTime,
            today: Math.ceil(eventDate.diff(dayjs(), 'day', true)) === 0
        };
    })

    return(
        <div className='calendar-block'>
            <div className='week-wrapper'>
                {weekInfo.map((dayInfo, i) => {
                    return(
                        <div className={'week-item' + (dayInfo.current ? ' current' : (dayInfo.weekEnd ? ' weekend' : '')) } key={i}>
                            <div className='day-name'>{dayInfo.dayName}</div>
                            <div className='date'>{dayInfo.date}</div>
                            <div className='dots-wrapper'>
                                {Array(dayInfo.events).fill().map((_, i) => <div className='dot' key={i}/>)}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='today-events'>
                {events.filter((e) => e.today).map((e, i) => {
                    return (
                        <div className='event' key={i}>
                            <div className='date'>{e.date}</div>
                            <div className='separator'></div>
                            <div className='description'>
                                <div className='name'>
                                    {e.name}
                                </div>
                                <div className='details'>
                                    <div className='location'>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        {e.place}
                                    </div>
                                    <div className='time'>
                                        <FontAwesomeIcon icon={faClock} />
                                        {e.time}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='next-events'>
                {events.filter((e) => !e.today).map((e, i) => {
                    return (
                        <div className='event' key={i}>
                            <div className='date'>{e.date}</div>
                            <div className='separator'></div>
                            <div className='description'>
                                <div className='name'>
                                    {e.name}
                                </div>
                                <div className='details'>
                                    <div className='location'>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        {e.place}
                                    </div>
                                    <div className='time'>
                                        <FontAwesomeIcon icon={faClock} />
                                        {e.time}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Calendar;
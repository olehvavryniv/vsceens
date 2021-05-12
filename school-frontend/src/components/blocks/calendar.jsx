import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";

function Calendar(props) {
    return(
        <div className='calendar-block'>
            <div className='week-wrapper'>
                <div className='week-item current'>
                    <div className='day-name'>ср</div>
                    <div className='date'>11</div>
                    <div className='dots-wrapper'>
                        <div className='dot'/>
                    </div>
                </div>
                <div className='week-item'>
                    <div className='day-name'>чт</div>
                    <div className='date'>12</div>
                    <div className='dots-wrapper'>
                        <div className='dot'/>
                        <div className='dot'/>
                    </div>
                </div>
                <div className='week-item'>
                    <div className='day-name'>пт</div>
                    <div className='date'>13</div>
                    <div className='dots-wrapper'></div>
                </div>
                <div className='week-item weekend'>
                    <div className='day-name'>ср</div>
                    <div className='date'>11</div>
                    <div className='dots-wrapper'></div>
                </div>
                <div className='week-item weekend'>
                    <div className='day-name'>чт</div>
                    <div className='date'>12</div>
                    <div className='dots-wrapper'>
                        <div className='dot'/>
                    </div>
                </div>
                <div className='week-item'>
                    <div className='day-name'>пт</div>
                    <div className='date'>13</div>
                    <div className='dots-wrapper'></div>
                </div>
                <div className='week-item'>
                    <div className='day-name'>ср</div>
                    <div className='date'>11</div>
                    <div className='dots-wrapper'></div>
                </div>
                <div className='week-item'>
                    <div className='day-name'>чт</div>
                    <div className='date'>12</div>
                    <div className='dots-wrapper'></div>
                </div>
                <div className='week-item'>
                    <div className='day-name'>пт</div>
                    <div className='date'>13</div>
                    <div className='dots-wrapper'></div>
                </div>
            </div>
            <div className='today-events'>
                <div className='event'>
                    <div className='date'>11</div>
                    <div className='separator'></div>
                    <div className='description'>
                        <div className='name'>
                            Вчительська нарада
                        </div>
                        <div className='details'>
                            <div className='location'>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                кабінет 109
                            </div>
                            <div className='time'>
                                <FontAwesomeIcon icon={faClock} />
                                14:00-15:30
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='next-events'>
                <div className='event'>
                    <div className='date'>12</div>
                    <div className='separator'></div>
                    <div className='description'>
                        <div className='name'>
                            Благодійний концерт «Хай живе Бандера»
                        </div>
                        <div className='details'>
                            <div className='location'>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                актова зала №34
                            </div>
                            <div className='time'>
                                <FontAwesomeIcon icon={faClock} />
                                14:00-15:30
                            </div>
                        </div>
                    </div>
                </div>
                <div className='event'>
                    <div className='date'>13</div>
                    <div className='separator'></div>
                    <div className='description'>
                        <div className='name'>
                            Вчительська нарада
                        </div>
                        <div className='details'>
                            <div className='location'>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                кабінет 109
                            </div>
                            <div className='time'>
                                <FontAwesomeIcon icon={faClock} />
                                14:00-15:30
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar;
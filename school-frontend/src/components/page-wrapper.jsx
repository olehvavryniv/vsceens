import React, { useState, useEffect } from 'react';
import Rewards from './blocks/rewards';
import Calendar from './blocks/calendar';
import Announcement from './blocks/announcement';
import Axios from 'axios';
import Header from './header';
import Video from './blocks/video';
import urls from '../helpers/urls';

function PageWrapper() {
    const [screen, setScreen] = useState(null);

    const getNextScreen = async () => {
        const response = await Axios.get(urls().nextScreenUrl);
        setTimeout(() => { getNextScreen() }, response.data.durationSeconds * 1000);
        setScreen(response.data);
    };

    useEffect(() => {
        getNextScreen();
    }, []);

    const selectScreen = (screenInfo) => {
        if (screenInfo == null) {
            return <div>Loading...</div>;
        }

        if (screenInfo.name === 'awards'){
            return <Rewards data={screenInfo.data}/>;
        } else if (screenInfo.name === 'calendar_events') {
            return <Calendar data={screenInfo.data}/>;
        } else if (screenInfo.name === 'notifications') {
            return <Announcement data={screenInfo.data}/>
        } else if (screenInfo.name === 'videos') {
            return <Video data={screenInfo.data}/>
        } else {
            return <div>Wrong screen</div>;
        }
    };

    return (
        <div className='main-panel'>
            <Header screen={screen}/>
            <div className='screen-wrapper'>
                { selectScreen(screen) }
            </div>
        </div>
    )
}

export default PageWrapper;
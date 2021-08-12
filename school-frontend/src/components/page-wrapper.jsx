import React, { useState, useEffect } from 'react';
import Rewards from './blocks/rewards';
import Calendar from './blocks/calendar';
import Announcement from './blocks/announcement';
import Axios from 'axios';
import Header from './header';

const nextScreenUrl = 'http://localhost:3001/next-screen';

function PageWrapper() {
    const [screen, setScreen] = useState(null);

    const getNextScreen = async () => {
        const response = await Axios.get(nextScreenUrl);
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
        // } else if (screenInfo.name === 'videos') {
        //     return <Video data={screenInfo.data}/>
        } else {
            return <div>Wrong screen</div>;
        }
    };

    return (
        <div className='main-panel'>
            <Header data={screen}/>
            <div className='screen-wrapper'>
                { selectScreen(screen) }
            </div>
        </div>
    )
}

export default PageWrapper;
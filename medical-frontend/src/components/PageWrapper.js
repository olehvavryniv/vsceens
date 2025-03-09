import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import NewsBlock from './NewsBlock';
import DocInfoBlock from './DocInfoBlock';
import VideoBlock from './VideoBlock';

const nextScreenUrl = 'http://localhost:3001/next-screen';
const organizationInfoUrl = 'http://localhost:3001/organization-info'

function PageWrapper() {
    const [screen, setScreen] = useState(null);
    const [organizationInfo, setOrganizationInfo] = useState(null);
    const [screenTimerId, setScreenTimerId] = useState(0);

    const getNextScreen = async () => {
        const screenResponse = await Axios.get(nextScreenUrl);
        const organizationResponse = await Axios.get(organizationInfoUrl);
        
        const timerId = setTimeout(() => { getNextScreen() }, screenResponse.data.durationSeconds * 1000);
        setOrganizationInfo(organizationResponse.data);
        setScreenTimerId(timerId);
        setScreen(screenResponse.data);
    };

    const checkMinuteOfSilence = () => {
        if (!organizationInfo.minuteOfSileceEnabled) {
            return;
        }

        const currentTime = new Date();
        const settingsTime = new Date(organizationInfo.minuteOfSilenceTime);
        if (currentTime.getHours() !== settingsTime.getHours()) {
            return;
        }
        if (currentTime.getMinutes() !== settingsTime.getMinutes()) {
            return;
        }

        clearTimeout(screenTimerId);
        setTimeout(() => { getNextScreen() }, organizationInfo.organizationInfo * 1000);
        setScreen({ name: 'videos', data: { code: organizationInfo.organizationInfo } })
    };

    useEffect(() => {
        getNextScreen();
        setInterval(checkMinuteOfSilence, 60 * 1000);
    }, []);

    const selectScreen = (screenInfo) => {
        if (screenInfo == null) {
            return <div>Loading...</div>;
        }

        if (screenInfo.name === 'news'){
            return <NewsBlock data={screenInfo.data}/>;
        } else if (screenInfo.name === 'doctor_infos') {
            return <DocInfoBlock data={screenInfo.data}/>;
        } else if (screenInfo.name === 'videos') {
            return <VideoBlock data={screenInfo.data}/>
        } else {
            return <div>Wrong screen</div>;
        }
    };

    return (
        <div className="page-wrapper">
            { selectScreen(screen) }
        </div>
    )
}

export default PageWrapper;

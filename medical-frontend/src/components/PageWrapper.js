import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import NewsBlock from './NewsBlock';
import DocInfoBlock from './DocInfoBlock';
import VideoBlock from './VideoBlock';

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
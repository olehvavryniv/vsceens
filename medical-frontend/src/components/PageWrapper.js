import React, { useState, useEffect, useCallback, useRef } from 'react';
import Axios from 'axios';
import NewsBlock from './NewsBlock';
import DocInfoBlock from './DocInfoBlock';
import VideoBlock from './VideoBlock';

const nextScreenUrl = 'http://localhost:3001/next-screen';
const organizationInfoUrl = 'http://localhost:3001/organization-info';

// Custom hook for managing screen rotation
const useScreenRotation = (organizationInfo) => {
    const [screen, setScreen] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const screenTimerRef = useRef(null);

    const clearScreenTimer = useCallback(() => {
        if (screenTimerRef.current) {
            clearTimeout(screenTimerRef.current);
            screenTimerRef.current = null;
        }
    }, []);

    const getNextScreen = useCallback(async () => {
        try {
            setError(null);
            const screenResponse = await Axios.get(nextScreenUrl);
            
            // Clear existing timer before setting new one
            clearScreenTimer();
            
            const timerId = setTimeout(() => getNextScreen(), (screenResponse.data.durationSeconds + 5) * 1000);
            screenTimerRef.current = timerId;
            setScreen(screenResponse.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to get next screen:', err);
            setError('Failed to load screen');
            // Retry after 5 seconds on error
            const retryTimerId = setTimeout(() => getNextScreen(), 5000);
            screenTimerRef.current = retryTimerId;
        }
    }, [clearScreenTimer]);

    const showSpecialScreen = useCallback((screenData, duration) => {
        clearScreenTimer();
        setScreen(screenData);
        
        const timerId = setTimeout(() => getNextScreen(), duration);
        screenTimerRef.current = timerId;
    }, [clearScreenTimer, getNextScreen]);

    useEffect(() => {
        return () => clearScreenTimer();
    }, [clearScreenTimer]);

    return { screen, loading, error, getNextScreen, showSpecialScreen };
};

// Custom hook for managing minute of silence functionality
const useMinuteOfSilence = (organizationInfo, showSpecialScreen) => {
    const intervalRef = useRef(null);
    const lastCheckedMinute = useRef(-1);

    const checkMinuteOfSilence = useCallback(() => {
        if (!organizationInfo?.minuteOfSilenceEnabled) {
            return;
        }

        const currentTime = new Date();
        const settingsTime = new Date(organizationInfo.minuteOfSilenceTime);
        const currentMinute = currentTime.getHours() * 60 + currentTime.getMinutes();
        const targetMinute = settingsTime.getHours() * 60 + settingsTime.getMinutes();

        // Only check once per minute to avoid duplicate triggers
        if (currentMinute === lastCheckedMinute.current) {
            return;
        }

        lastCheckedMinute.current = currentMinute;

        // Check if we're at the target time
        if (currentMinute === targetMinute) {
            const silenceDuration = (organizationInfo.minuteOfSilenceVideoDuration + 5) * 1000;
            const silenceScreen = { 
                name: 'videos', 
                data: { code: organizationInfo.minuteOfSilenceVideoCode } 
            };
            showSpecialScreen(silenceScreen, silenceDuration);
        }
    }, [organizationInfo, showSpecialScreen]);

    useEffect(() => {
        if (organizationInfo?.minuteOfSilenceEnabled) {
            // Check every 30 seconds instead of every second for better performance
            intervalRef.current = setInterval(checkMinuteOfSilence, 30000);
            // Also check immediately
            checkMinuteOfSilence();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [checkMinuteOfSilence, organizationInfo?.minuteOfSilenceEnabled]);
};

// Custom hook for organization info
const useOrganizationInfo = () => {
    const [organizationInfo, setOrganizationInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrganizationInfo = async () => {
            try {
                const response = await Axios.get(organizationInfoUrl);
                setOrganizationInfo(response.data);
                setError(null);
            } catch (err) {
                console.error('Failed to get organization info:', err);
                setError('Failed to load organization info');
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizationInfo();
    }, []);

    return { organizationInfo, loading, error };
};

function PageWrapper() {
    const { organizationInfo, loading: orgLoading, error: orgError } = useOrganizationInfo();
    const { screen, loading: screenLoading, error: screenError, getNextScreen, showSpecialScreen } = useScreenRotation(organizationInfo);
    
    // Initialize minute of silence functionality
    useMinuteOfSilence(organizationInfo, showSpecialScreen);

    // Start screen rotation when component mounts
    useEffect(() => {
        if (!orgLoading && !orgError) {
            getNextScreen();
        }
    }, [orgLoading, orgError, getNextScreen]);

    const selectScreen = (screenInfo) => {
        if (orgError) {
            return <div>Error loading organization info: {orgError}</div>;
        }

        if (screenError) {
            return <div>Error loading screen: {screenError}</div>;
        }

        if (orgLoading || screenLoading || screenInfo == null) {
            return <div>Loading...</div>;
        }

        switch (screenInfo.name) {
            case 'news':
                return <NewsBlock data={screenInfo.data}/>;
            case 'doctor_infos':
                return <DocInfoBlock data={screenInfo.data}/>;
            case 'videos':
                return <VideoBlock data={screenInfo.data}/>;
            default:
                return <div>Unknown screen type: {screenInfo.name}</div>;
        }
    };

    return (
        <div className="page-wrapper">
            {selectScreen(screen)}
        </div>
    );
}

export default PageWrapper;

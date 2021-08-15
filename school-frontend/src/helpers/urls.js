export default function urls() {
    const domain = process.env.REACT_APP_BACKEND_DOMAIN || 'http://localhost:3001';
    return {
        schedulesInfoUrl: domain + '/get-schedules',
        nextScreenUrl: domain + '/next-screen'
    };
}
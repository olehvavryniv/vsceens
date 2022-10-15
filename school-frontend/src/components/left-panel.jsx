import Schedules from './schedules';

function LeftPanel(props) {
    return(
        <div className='left-panel'>
            <div className='logo-wrapper'>
                <img src={process.env.PUBLIC_URL + '/logo.png'} alt=''/>
            </div>
            <Schedules/>
        </div>
    );
}

export default LeftPanel;

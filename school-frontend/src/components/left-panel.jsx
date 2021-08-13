import Logo from '../images/logo.png';
import Schedules from './schedules';

function LeftPanel(props) {
    return(
        <div className='left-panel'>
            <div className='logo-wrapper'>
                <img src={Logo} alt=''/>
            </div>
            <Schedules/>
        </div>
    );
}

export default LeftPanel;
import Logo from '../images/logo.png';
import Schedule from './schedule';

function LeftPanel(props) {
    return(
        <div className='left-panel'>
            <div className='logo-wrapper'>
                <img src={Logo}/>
            </div>
            <div className='schedules-wrapper'>
                <Schedule/>
                <Schedule/>
                <Schedule/>
            </div>
        </div>
    );
}

export default LeftPanel;
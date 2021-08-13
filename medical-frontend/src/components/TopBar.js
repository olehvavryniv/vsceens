import Logo from '../images/logo.png';
import DateTime from "./DateTime";

function TopBar() {
    return (
        <div className="top-bar">
            <div className="top-bar-item">
                <DateTime/>
            </div>
            <div className="top-bar-item">
                <div className="organization-name">
                    <div>Комунальне некомерційне підприємство</div>
                    <div>"Центр первинної медико-саніторної допомоги"</div>
                </div>
            </div>
            <div className="top-bar-item">
                <img src={Logo} alt=''></img>
            </div>
        </div>
    );
  }
  
  export default TopBar;
  
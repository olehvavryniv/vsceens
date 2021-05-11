function Header(props) {
    return(
        <div className='header'>
          <div className='heading'>
            Вітаємо з Днем народження!
          </div>
          <div className='clock-wrapper'>
              <div className='time'>13:21</div>
              <div className='date'>31 листопада</div>
          </div>
        </div>
    );
}

export default Header;
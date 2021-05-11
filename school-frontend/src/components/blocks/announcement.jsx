function Announcement(props) {
    return(
        <div className='announcement-block'>
          <div className='announcement'>
              <div className='dot red'></div>
              <div className='text'>З 1 вересня учні без щеплення порти кору допускатися до навчання не будуть!</div>
          </div>

          <div className='announcement'>
              <div className='dot blue'></div>
              <div className='text'>Запрошуємо до реєстрації усіх бажаючиху шкільний театр «Водограй». Звертайтеся до секретаря!</div>
          </div>

          <div className='announcement'>
              <div className='dot red'></div>
              <div className='text'>З 1 вересня учні без щеплення порти кору допускатися до навчання не будуть!</div>
          </div>

          <div className='description'>
            *щоб розмісти тут своє оголошення, зверніться до секретаря
          </div>
        </div>
    );
}

export default Announcement;
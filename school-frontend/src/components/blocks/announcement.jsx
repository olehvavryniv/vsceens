function Announcement({data}) {
    return(
        <div className='announcement-block'>
            { data.map((item) => {
                const className = "dot " + (item.priority ? 'red' : 'blue');
                return(
                    <div className='announcement'>
                        <div className={className}></div>
                        <div className='text'>{ item.text }</div>
                    </div>
                )
                }) 
            }

          <div className='description'>
            *щоб розмісти тут своє оголошення, зверніться до секретаря
          </div>
        </div>
    );
}

export default Announcement;
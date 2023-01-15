function Announcement({data}) {
    return(
        <div className='announcement-block'>
            { data.map((item, id) => {
                const className = "dot " + (item.priority ? 'red' : 'blue');
                return(
                    <div className='announcement' key={id}>
                        <div className={className}></div>
                        <div className='text'>{ item.text }</div>
                    </div>
                )
                }) 
            }

          <div className='description'>
            *щоб розмісти тут своє оголошення, зверніться до адміністрації
          </div>
        </div>
    );
}

export default Announcement;

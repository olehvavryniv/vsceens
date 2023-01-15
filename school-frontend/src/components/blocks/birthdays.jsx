import image from '../../images/image1.png';

function Birthdays({ data }) {
    return (
        <div className='birthdays-block'>
            <div className='birthdays'>
                { data.map((item) => {
                    return (
                        <div className='birthday-item'>
                            <div className='name'>{ item.name }</div>
                            <div className='label'>{ item.title }</div>
                        </div>
                    )
                }) 
                }
            </div>
            {/* <div className='famous-birthday'>
                <div className='photo'>
                    <img src={image}></img>
                </div>
                <div className='info'>
                    <div className='years'>1886-1967</div>
                    <div className='name'>Крип’якевич Іван Петрович</div>
                    <div className='description'>український історик, академік, професор, письменник і кльовий чувак</div>
                </div>
            </div> */}
        </div>
    );
}

export default Birthdays;

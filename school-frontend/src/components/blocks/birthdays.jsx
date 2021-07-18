import image from '../../images/image1.png';

function Birthdays(props) {
    return (
        <div className='birthdays-block'>
            <div className='birthdays'>
                <div className='birthday-item'>
                    <div className='name'>Журавльва Олександра</div>
                    <div className='label'>вчителька англійської мови</div>
                </div>
                <div className='birthday-item'>
                    <div className='name'>Журавльва Олександра</div>
                    <div className='label'>вчителька англійської мови</div>
                </div>
                <div className='birthday-item'>
                    <div className='name'>Журавльва Олександра</div>
                    <div className='label'>вчителька англійської мови</div>
                </div>
                <div className='birthday-item'>
                    <div className='name'>Журавльва Олександра</div>
                    <div className='label'>вчителька англійської мови</div>
                </div>
            </div>
            <div className='famous-birthday'>
                <div className='photo'>
                    <img src={image}></img>
                </div>
                <div className='info'>
                    <div className='years'>1886-1967</div>
                    <div className='name'>Крип’якевич Іван Петрович</div>
                    <div className='description'>український історик, академік, професор, письменник і кльовий чувак</div>
                </div>
            </div>
        </div>
    );
}

export default Birthdays;
import image1 from '../../images/image2.png';
import image2 from '../../images/image3.png';

function Rewards(props) {
    return(
        <div className='rewards-block'>
            <div className='reward'>
                <div className='photo'>
                    <img src={image1} alt=''/>
                </div>
                <div className='title'>
                    Танцювальний колектив «Смерічка» (середня група)
                </div>
                <div className='description'>
                    переможець літературно-мистецького конкурсу «Тернослов 2020»
                </div>
            </div>
            <div className='reward'>
                <div className='photo'>
                    <img src={image2} alt=''/>
                </div>
                <div className='title'>
                    Дует Грималюк Надіята Гнідий Максим
                </div>
                <div className='description'>
                    фіналісти конкурсу«Школа має талант»
                </div>
            </div>
        </div>
    );
}

export default Rewards;
import DocPhoto from '../images/doc_photo.jpeg';

function DocInfoBlock(props) {
    const { data } = props;
    return(
        <div className="doc-info-block">
            <div className="left-panel">
                <div className="photo-wrapper">
                    <img src={DocPhoto}></img>
                </div>
                <div className="declarations-info">
                    <span className="label">Кількість декларацій лікаря: </span>
                    {data.declarationCount}
                </div>
                <div className="declarations-date">
                    станом на {data.declarationDate}
                </div>
            </div>
            <div className="right-panel">
                <div className="name">
                    {data.name}
                </div>
                <div className="specialization">
                    <span>{data.specialty}</span>
                </div>
                <div className="info-item education">
                    <div className="label">
                        Освіта:
                    </div>
                    <div className="value">
                        <div>
                            {data.education}
                        </div>
                        <div>
                            <i>Спеціальність: </i>
                            <span>{data.educationSpecialty}</span>
                        </div>
                    </div>
                </div>
                <div className="info-item">
                    <div className="label">
                        Кваліфікаційна категорія:
                    </div>
                    <div className="value">
                        {data.category}
                    </div>
                </div>
                <div className="info-item">
                    <div className="label">
                        Досвід роботи:
                    </div>
                    <div className="value">
                        {data.experience}
                    </div>
                </div>
                <div className="info-item address">
                    <div className="label">
                        Адреса:
                    </div>
                    <div className="value">
                        <div>{data.workPlace}</div>
                        <div>{data.address}</div>
                        <div>
                            <i>зав.абмул.: </i>
                            <span>{data.boss}</span>
                        </div>
                    </div>
                </div>
                <div className="info-item">
                    <div className="label">
                        Реєстратура:
                    </div>
                    <div className="value">
                        {data.phones}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocInfoBlock;
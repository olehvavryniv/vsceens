import DocPhoto from '../images/doc_photo.jpeg';

function DocInfoBlock() {
    return(
        <div className="doc-info-block">
            <div className="left-panel">
                <div className="photo-wrapper">
                    <img src={DocPhoto}></img>
                </div>
                <div className="declarations-info">
                    <span className="label">Кількість декларацій лікаря: </span>
                    1652
                </div>
                <div className="declarations-date">
                    станом на 27.05.2021
                </div>
            </div>
            <div className="right-panel">
                <div className="name">
                    Бондаренко Галина Юріївна
                </div>
                <div className="specialization">
                    <span>Лікар загальної практики - сімейний лікар</span>
                </div>
                <div className="info-item education">
                    <div className="label">
                        Освіта:
                    </div>
                    <div className="value">
                        <div>
                            1981 р., Тернопільський державний медичний інститут
                        </div>
                        <div>
                            <i>Спеціальність: </i>
                            <span>загальна практика-сімейна медицина</span>
                        </div>
                    </div>
                </div>
                <div className="info-item">
                    <div className="label">
                        Кваліфікаційна категорія:
                    </div>
                    <div className="value">
                        вища
                    </div>
                </div>
                <div className="info-item">
                    <div className="label">
                        Досвід роботи:
                    </div>
                    <div className="value">
                        37 років стажу
                    </div>
                </div>
                <div className="info-item address">
                    <div className="label">
                        Адреса:
                    </div>
                    <div className="value">
                        <div>Амбулаторія №3, каб 57</div>
                        <div>вул. Князя Острозького, 6</div>
                        <div>
                            <i>зав.абмул.: </i>
                            <span>Олексієвець Соломія Ростиславівна (каб. 51)</span>
                        </div>
                    </div>
                </div>
                <div className="info-item">
                    <div className="label">
                        Реєстратура:
                    </div>
                    <div className="value">
                        52-74-07, +38 0672132183
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DocInfoBlock;
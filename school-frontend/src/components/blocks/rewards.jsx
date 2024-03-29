function Rewards({data}) {
    return(
        <div className='rewards-block'>
            { data.map((reward, id) => {
                return(
                    <div className='reward' key={id}>
                        <div className='photo'>
                            <img src={`data:image/jpeg;base64,${reward.photoBase64}`} alt=''></img>
                        </div>
                        <div className='title'>
                            { reward.header }
                        </div>
                        <div className='description'>
                            { reward.description }
                        </div>
                    </div>
                )
            }) }
        </div>
    );
}

export default Rewards;
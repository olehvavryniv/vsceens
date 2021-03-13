function NewsBlock(props) {
    return(
        <div className="news-block">
            <div className="header">
                {props.data.title}
            </div>
            <div className="content" dangerouslySetInnerHTML={{__html: props.data.content}}>
            </div>
        </div>
    );
}

export default NewsBlock;
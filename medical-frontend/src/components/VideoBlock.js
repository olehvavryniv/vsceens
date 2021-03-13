 import YouTube from 'react-youtube';

function VideoBlock(props) {
    const opts = {
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: 1
        }
    };
    return (
        <YouTube videoId={props.data.code} opts={opts} containerClassName="video-container"/>
    );
}

export default VideoBlock;
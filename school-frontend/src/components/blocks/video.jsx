import YouTube from 'react-youtube';

function Video({data}) {
    const opts = {
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: 1,
            controls: 0,
            iv_load_policy: 3,
            rel: 0
        }
    };
    return(
        <YouTube videoId={data[0].code} opts={opts} containerClassName="video-container"/>
    );
}

export default Video;
import PlayIcon from "../assets/images/play.svg"
import PauseIcon from "../assets/images/pause-icon.svg"

interface IPlaybackRate {
    setStatus: () => void
    status: boolean
}
const PlayButton = ({ setStatus, status }: IPlaybackRate) => {
    console.log(status);
    return (
        <button role='pause video' className="play-button" onClick={() => setStatus()}>
            {
                !status ? (
                    <img src={PlayIcon} />
                ) : (<img src={PauseIcon} />)
            }
        </button>
    );
}

export default PlayButton;
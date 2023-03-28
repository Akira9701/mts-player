interface IPlaybackRate {
    handlePlaybackRate: (rate: number) => void
    rate: number
    rateStatus: number
}


const PlaybackRate = ({ handlePlaybackRate, rate, rateStatus }: IPlaybackRate) => {



    return (
        <button role={"set playback rate " + String(rate)} onClick={() => handlePlaybackRate(rate)} className={rateStatus === rate ? 'rate-active' : ""}>
            {
                rate
            }x
        </button>
    );
}

export default PlaybackRate;
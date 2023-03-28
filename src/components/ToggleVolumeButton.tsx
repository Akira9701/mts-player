import VolumeOn from "../assets/images/volumeon.svg";
import VolumeOff from "../assets/images/mute.svg"
import AdOn from "../assets/images/ad.svg"
import AdOff from "../assets/images/ad-off.svg"
interface IVolumeButton {
    handleMuteVolume: (a: string) => void;
    volumeStatus: boolean,
    type: string,
}

const ToggleVolumeButton = ({ type, volumeStatus, handleMuteVolume }) => {
    return (
        <button role={"mute or unmute " + (type === 'audio' ? 'audio' : 'comments')} className="toggle-volume-button" onClick={() => handleMuteVolume(type)}>
            {

                type === "audio"
                    ? (volumeStatus ? <img src={VolumeOn} /> : <img src={VolumeOff} />)
                    : (volumeStatus ? <img src={AdOn} /> : <img src={AdOff} />)
            }
        </button >
    );
}

export default ToggleVolumeButton;
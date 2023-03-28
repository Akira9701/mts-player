interface IVolumeButton {
    handleVolume: (type: string, value: string) => void
    type: string
    value: string
}

const VolumeButton = ({ handleVolume, type, value }: IVolumeButton) => {
    return (
        <button role={(value === "+" ? "increase " : "decrease ") + (type === "video" ? "audio " : "comments ")} className="volume-button" onClick={() => handleVolume(type, value)}>
            {
                value
            }
        </button>
    );
}

export default VolumeButton;
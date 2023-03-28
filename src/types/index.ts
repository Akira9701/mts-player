import Player from "video.js/dist/types/player"
import * as Events from "video.js/dist/types/utils/events";// import VideoJsPla
export interface IPlayerCustom extends Player {
    // on?: typeof Events.on;
}

export interface VjsProps {
	options: Player;
    onReady?: (player: Player) => void;
}

export interface IProgressRef {

}
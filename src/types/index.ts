import Player from "video.js/dist/types/player"
import * as Events from "video.js/dist/types/utils/events";// import VideoJsPla
export interface IPlayerCustom extends Player {
    on?: any
}

export interface VjsProps {
	options: {
        autoplay?: boolean,
        responsive?: boolean,
        fluid?: boolean,
        playbackRates?: Array<number>,
        controlBar?: {
          volumePanel: {
            inline: boolean
          }
        },
        sources: [{
          src?: string,
          type?: string,
        }],
        autoSetup?: boolean,
        inactivityTimeout?: number
    }
    onReady?: (player: Player) => void;
}

export interface IProgressRef {

}
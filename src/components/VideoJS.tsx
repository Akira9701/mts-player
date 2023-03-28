import React from 'react';
import videojs from 'video.js';
import "video.js/dist/video-js.css";
import Player from "video.js/dist/types/player"
import { VjsProps } from '../types';

import 'video.js/dist/video-js.css';

const VideoJS = ({ options, onReady }: VjsProps) => {
  const videoRef = React.useRef<HTMLDivElement | null>(null);
  const playerRef = React.useRef<Player | null>(null);

  React.useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current?.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  // React.useEffect(() => {
  //   const player = playerRef.current;

  //   status ? (player.currentTime(time + 0.1), player.play()) : player.pause();

  // }, [status])


  return (
    <div data-vjs-player className='video-container'>
      <div ref={videoRef} className=' video-player' />
    </div>
  );
}

export default React.memo(VideoJS, (prevProps, nextProps) => {
  // if (prevProps.status === nextProps.status) {

  //   return true;
  // }
  // else if (prevProps.volume !== nextProps.volume) {
  //   console.log(545);

  //   return false;
  // }
  // else {
  //   return false;
  // }
  return true
})
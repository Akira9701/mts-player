import React from 'react';
import videojs from 'video.js';
import "video.js/dist/video-js.css";
import Player from "video.js/dist/types/player"
import { VjsProps } from '../types';


import 'video.js/dist/video-js.css';

const AudioJS = ({ options, onReady, }: VjsProps) => {
  const videoRef = React.useRef<HTMLDivElement | null>(null);
  const playerRef = React.useRef<Player | null>(null);
  // console.log(status);  
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
      status && player.play();
      player.controls(true);
      console.log(status);
      console.log('here');


      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;
      // player.autoplay(options.autoplay);
      player.src(options.sources);
      player.controls(true);

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

  // React.useEffect(() => {
  //   const player = playerRef.current;
  //   player.volume(volume);


  //   // console.log(volume)


  // }, [volume])





  return (
    <div data-vjs-player className='audio-container'>
      <div ref={videoRef} className='audio-player' />
    </div>
  );
}

export default React.memo(AudioJS, (prevProps, nextProps) => {


  return true;

})
import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import audio from './assets/audio.mp3';
import video from './assets/video.mp4';
import videojs from 'video.js';
import VideoJS from './components/VideoJS'
import AudioJS from './components/AudioJS'

function App() {
  const [status, setStatus] = useState(false);
  const [time, setTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    playbackRates: [1, 1.2, 1.5],
    controlBar: {
      volumePanel: {
        inline: false
      }
    },
    sources: [{
      src: video,
      type: 'video/mp4'
    }],
    autoSetup: false,

  };

  const videoAudioJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    inactivityTimeout: 0,
    // controlBar: {
    //   volumePanel: {
    //     inline: false
    //   }
    // },
    // audioOnlyMode: true,
    sources: [{
      src: audio,
      // type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    console.log(player)
    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });

    player.on('play', function () {
      setStatus(true);
      setTime(player.currentTime());

    });
    player.on('pause', function () {
      setStatus(false);
      setTime(player.currentTime());

    });

    player.on('timeupdate', function () {
      // setStatus(false);
      setTime(player.currentTime());
    });

    player.on('volumechange', function () {
      setVolume(player.volume());
      console.log(volume)

    });

  };

  const handleAudioPlayerReady = (player) => {
    playerRef.current = player;
    console.log(player)
    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });

    player.on('play', function () {
      // setStatus(true);
    });
    player.on('pause', function () {
      // setStatus(false);
    });

    player.on('timeupdate', function () {
      // setStatus(false);
      // setTime(player.currentTime());
    });


  };




  useEffect(() => {
    console.log(volume);
  }, [volume])
  return (
    <div className="App">
      <div className="player_container">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        <div className="audio_block">
          <AudioJS volume={volume} time={time} status={status} options={videoAudioJsOptions} onReady={handleAudioPlayerReady} />
          <p className='audio_title'>Регулировка громкости аудио-коментирования </p>
        </div>
      </div>
    </div>
  )
}

export default App

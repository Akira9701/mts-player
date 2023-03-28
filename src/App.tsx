import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import audio from './assets/audio.mp3';
import video from './assets/video.mp4';
import videojs from 'video.js';
import VideoJS from './components/VideoJS'
import AudioJS from './components/AudioJS'
import PlayButton from './components/PlayButton';
import VolumeButton from './components/VolumeButton';
import PlaybackRate from './components/PlaybackRate';
import ProgressBar from './components/ProgressBar';
// import FullScreenButton from './components/FullScreenButton';
import Player from 'video.js/dist/types/player'
import { IPlayerCustom } from './types';
import ToggleVolumeButton from './components/ToggleVolumeButton';

function App() {
  const [status, setStatus] = useState(false);
  const [rate, setRate] = useState(1);
  const [volumeStatus, setVolumeStatus] = useState(true);
  const [commentStatus, setCommentStatus] = useState(true);
  // const [volume, setVolume] = useState(1);
  const playerRef = React.useRef<IPlayerCustom | null>(null);
  const audioRef = React.useRef<IPlayerCustom | null>(null);
  const progressRef = React.useRef<HTMLElement | null>(null);

  const videoJsOptions = {
    autoplay: false,
    // controls: true,
    responsive: true,
    fluid: true,
    playbackRates: [1, 1.25, 1.5],
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

  const handlePlayerReady = (player: IPlayerCustom) => {
    playerRef.current = player;
    // console.log(player)
    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });

    player.on('play', function () {
      setStatus(true);
      audioRef.current?.play();
      // setTime(player.currentTime());

    });
    player.on('pause', function () {
      setStatus(false)
      audioRef.current?.pause();

      // setStatus(false);
      // setTime(player.currentTime());

    });

    player.on('timeupdate', function () {
      progressRef.current.children[0].style.width = String(player.currentTime() / player.duration() * 100) + "%";
      // console.log();
      // setStatus(false);
      // setTime(player.currentTime());
    });

    player.on('volumechange', function () {
      // setVolume(player.volume());
      // console.log(volume)

    });

    player.on('ratechange', function () {
      console.log(3);

    });


  };

  const handleAudioPlayerReady = (player) => {
    audioRef.current = player;
    // console.log(player)
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




  const handlePause = () => {
    if (playerRef.current !== null && audioRef.current !== null) {
      const player = playerRef.current;
      const audio = audioRef.current;
      player.paused() ? (player.play(), audio.play(), setStatus(true)) : (player.pause(), audio.pause(), setStatus(false));
    }

  }

  const handleVolume = (type: string, value: string) => {
    if (playerRef.current !== null && audioRef.current !== null) {


      const player = playerRef.current;
      console.log(type, value);

      const audio = audioRef.current;
      if (type === "video") {

        value === '+' ? player.volume((player.volume() + 0.1)) : player.volume((player.volume() - 0.1));
      } else if (type === "audio") {
        value === '+' ? audio.volume((audio.volume() + 0.1)) : audio.volume((audio.volume() - 0.1));

      } else if (type === 'audioff') {
        audio.volume(0);
      } else if (type === 'audioon') {
        audio.volume(100)

      }

    }
  }

  const handlePlaybackRate = (rate: number) => {

    if (playerRef.current !== null && audioRef.current !== null) {


      const player = playerRef.current;
      const audio = audioRef.current;
      console.log();
      player.playbackRate(rate);
      audio.playbackRate(rate);
      setRate(rate);



    }
  }

  const handleProgress = (percent: number) => {
    if (playerRef.current !== null && audioRef.current !== null) {


      const player = playerRef.current;
      const audio = audioRef.current;
      // console.log(percent);
      player.currentTime(player.duration() * (percent / 100));
      audio.currentTime(player.duration() * (percent / 100));

      // console.log(player.d)

    }
  }

  const handleMuteVolume = (type: string) => {

    if (playerRef.current !== null && audioRef.current !== null) {
      console.log(54);

      const player = playerRef.current;
      const audio = audioRef.current;
      console.log(volumeStatus);
      if (type === 'audio') {
        volumeStatus ? (player.volume(0), setVolumeStatus(false)) : (player.volume(100), setVolumeStatus(true));
      } else {
        commentStatus ? (audio.volume(0), setCommentStatus(false)) : (audio.volume(100), setCommentStatus(true));

      }

    }
  }




  return (
    <div className="App">
      <div className="player_container">
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        <div className="player-panel" role='control buttons'>
          <div className="buttons-block">
            <div className="buttons-block_left-wrap">
              <PlayButton setStatus={handlePause} status={status} />
              <div className="standart-volume" role='control voice'>
                <ToggleVolumeButton type={'audio'} handleMuteVolume={handleMuteVolume} volumeStatus={volumeStatus} />
                <div className={"volume-buttons_wrap " + (!volumeStatus && "volume-buttons_wrap-none")}>
                  <VolumeButton handleVolume={handleVolume} type={"video"} value={"+"} />
                  <VolumeButton handleVolume={handleVolume} type={"video"} value={"-"} />
                </div>

              </div>
              <div className="comment-volume" role='control comments'>
                <ToggleVolumeButton type={'comment'} handleMuteVolume={handleMuteVolume} volumeStatus={commentStatus} />
                <div className={"volume-buttons_wrap " + (!commentStatus && "volume-buttons_wrap-none")}>
                  <VolumeButton handleVolume={handleVolume} type={"audio"} value={"+"} />
                  <VolumeButton handleVolume={handleVolume} type={"audio"} value={"-"} />
                </div>

              </div>
            </div>
            <div className="buttons-block_right-wrap" role='control playback rate'>
              {
                videoJsOptions.playbackRates.map(el => <PlaybackRate key={el} rateStatus={rate} handlePlaybackRate={handlePlaybackRate} rate={el} />)


              }
            </div>






          </div>
          <div className="progress-block">
            <ProgressBar ref={progressRef} handleProgress={handleProgress} />

          </div>
        </div>

        <div className="audio_block">
          <AudioJS options={videoAudioJsOptions} onReady={handleAudioPlayerReady} />
          {/* <p className='audio_title'>Регулировка громкости аудио-коментирования </p> */}
        </div>
      </div>
    </div>
  )
}

export default App

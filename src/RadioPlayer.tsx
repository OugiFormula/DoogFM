import React, { useEffect, useRef, useState } from 'react';
import playImage from './assets/play.png'; // Check the relative path to play.png
import pauseImage from './assets/pause.png'; // Check the relative path to pause.png
import './App.css';

interface RadioPlayerProps {
  radioUrl: string;
  audioRef: React.RefObject<HTMLAudioElement> | null;
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ radioUrl, audioRef }) => {
  const [volume, setVolume] = useState(0.5);
  const volumeRef = useRef<number>(0.5);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.src = radioUrl;

      if (!audioRef.current.hasAttribute('data-initialized')) {
        audioRef.current.volume = volumeRef.current;
        audioRef.current.setAttribute('data-initialized', 'true');
      }

      if (!audioRef.current.paused) {
        audioRef.current.volume = volume;
        setIsPaused(false);
      }
    }
  }, [radioUrl, audioRef]);

  const handlePlayPause = () => {
    if (audioRef?.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsPaused(!audioRef.current.paused);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volumeValue = parseFloat(event.target.value);
    if (audioRef?.current) {
      audioRef.current.volume = volumeValue;
      setVolume(volumeValue);
      volumeRef.current = volumeValue;
    }
  };

  return (
    <div className="radio-player">
      <audio ref={audioRef} onVolumeChange={() => {}}>
        Your browser does not support the audio element.
      </audio>
      <div className="visualizer-container">
        {/* Add your audio visualizer here */}
      </div>
      <div className="controls-container">
        <button className="play-pause-button" onClick={handlePlayPause}>
          {isPaused ? (
            <img src={pauseImage} alt="Pause" />
          ) : (
            <img src={playImage} alt="Play" />
          )}
        </button>
        <input
          type="range"
          className="volume-slider artwork-image"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default RadioPlayer;

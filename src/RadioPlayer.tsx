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
  const volumeRef = useRef<number>(0.5); // Use useRef to store initial volume
  const [isPaused, setIsPaused] = useState(true); // Add isPaused state

  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.src = radioUrl;

      // Set the initial volume only once when the audio element is created
      if (!audioRef.current.hasAttribute('data-initialized')) {
        audioRef.current.volume = volumeRef.current;
        audioRef.current.setAttribute('data-initialized', 'true');
      }

      if (!audioRef.current.paused) {
        audioRef.current.volume = volume;
        setIsPaused(false); // Update the play/pause state based on the audio element's paused status
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
      setIsPaused(!audioRef.current.paused); // Update the play/pause state based on the audio element's paused status
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volumeValue = parseFloat(event.target.value);
    if (audioRef?.current) {
      audioRef.current.volume = volumeValue;
      setVolume(volumeValue);
      volumeRef.current = volumeValue; // Update the volumeRef when the volume changes
    }
  };

  return (
    <div className="radio-player">
      {/* Your existing code for radio player controls */}
      <audio ref={audioRef} onVolumeChange={() => {}}>
        Your browser does not support the audio element.
      </audio>
      <div className="visualizer-container">
        {/* Add your audio visualizer here */}
      </div>
      <div className="controls-container">
        <button className="play-pause-button" onClick={handlePlayPause}>
          {isPaused ? (
            <img src={pauseImage} alt="Pause" /> // Use the imported play image
          ) : (
            <img src={playImage} alt="Play" /> // Use the imported pause image
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

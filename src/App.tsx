import React, { useState, useRef, useEffect } from 'react';
import RadioPlayer from './RadioPlayer';
import SongTitleFetcher from './SongTitleFetcher';
import ArtworkFetcher from './ArtworkFetcher';
import logo from '../src/assets/logo.png';
import Favorites from './Favorites';
import Popup from './Popup';
import ChatWidget from './ChatWidget';

import './App.css';

const App: React.FC = () => {
  const [radioUrl, setRadioUrl] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showPopup, setShowPopup] = useState(true); // State for showing the popup

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioUrl(event.target.value);
  };

  const closePopup = () => {
    localStorage.setItem('popupDismissed', 'true');
    setShowPopup(false);
  };

  useEffect(() => {
    const dismissed = localStorage.getItem('popupDismissed');
    if (dismissed) {
      setShowPopup(false);
    }
  }, []);

  return (
    <div>
      {showPopup && <Popup onClose={closePopup} />} {/* Render the popup */}
      <div className="artwork-background">
        {/* The ArtworkFetcher component will display the artwork image */}
        <ArtworkFetcher radioUrl={radioUrl} />
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter radio URL"
          value={radioUrl}
          onChange={handleInputChange}
        />
        <Favorites setRadioUrl={setRadioUrl} />
      </div>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="app-content">
        <div className="mobile-container">
          <div className="artwork-container artwork-image">
            {/* The ArtworkFetcher component will display the artwork image */}
            <ArtworkFetcher radioUrl={radioUrl} />
          </div>
          <div className="title-artist-container">
            {/* The SongTitleFetcher component will display the title and artist */}
            <SongTitleFetcher radioUrl={radioUrl} />
          </div>
        </div>
        <RadioPlayer radioUrl={radioUrl} audioRef={audioRef} />
        <a
          href="https://ko-fi.com/yukiokoito"
          target="_blank"
          rel="noopener noreferrer"
          className="kofi-banner"
        >
          <img className="kofi-banner" src="./kofi_button.png" alt="Support me on Ko-fi" />
        </a>
      </div>
      <ChatWidget />
    </div>
  );
};

export default App;

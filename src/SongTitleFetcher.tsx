import React, { useState, useEffect } from 'react';
import axios from 'axios';
import spotify from '../src/assets/spotify.png';
import youtube from '../src/assets/youtube.png';
import './App.css';

interface SongTitleFetcherProps {
  radioUrl: string;
}

const SongTitleFetcher: React.FC<SongTitleFetcherProps> = ({ radioUrl }) => {
  const [artist, setArtist] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  const fetchMetadata = async () => {
    try {
      const response = await axios.get(
        `https://api.streamafrica.net/metadata/index.php?z=${encodeURIComponent(radioUrl)}`
      );
      if (response.data && response.data.currentArtist && response.data.currentSong) {
        setArtist(response.data.currentArtist);
        setTitle(response.data.currentSong);
      }
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  };

  useEffect(() => {
    // Fetch song title initially
    fetchMetadata();

    // Fetch song title every 10 seconds
    const interval = setInterval(fetchMetadata, 10000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [radioUrl]);

  const handleSpotifySearch = () => {
    if (artist && title) {
      const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(
        artist + ' ' + title
      )}`;
      window.open(spotifySearchUrl, '_blank');
    }
  };

  const handleYoutubeSearch = () => {
    if (artist && title) {
      const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
        artist + ' ' + title
      )}`;
      window.open(youtubeSearchUrl, '_blank');
    }
  };

  return (
    <div className="song-container">
      <div className="title-artist-container">
        {artist && title ? (
          <div>
            <h2>{title}</h2>
            <p>{artist}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
        {artist && title ? (
            <div className="spotify-button" onClick={handleSpotifySearch}>
            <img src={spotify} alt="Spotify" />
            </div>
          ) : (
            <p></p>
          )}
        {artist && title ? (
            <div className="spotify-button" onClick={handleYoutubeSearch}>
            <img src={youtube} alt="Youtube" />
            </div>
          ) : (
            <p></p>
          )}
    </div>
  );
};

export default SongTitleFetcher;

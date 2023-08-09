import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <>
      {artist && title ? (
        <div>
          <h2>{title}</h2>
          <p>by {artist}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default SongTitleFetcher;

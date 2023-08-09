import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ArtworkFetcherProps {
  radioUrl: string;
}

const ArtworkFetcher: React.FC<ArtworkFetcherProps> = ({ radioUrl }) => {
  const [artist, setArtist] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [artworkUrl, setArtworkUrl] = useState<string | null>(null);

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
    // Fetch metadata initially
    fetchMetadata();

    // Fetch metadata every 10 seconds
    const interval = setInterval(fetchMetadata, 10000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [radioUrl]);

  const fetchArtworkUrl = async (artist: string, title: string) => {
    try {
      const response = await axios.get(
        `https://api.streamafrica.net/new.search.php?query='${encodeURIComponent(
          artist + ' ' + title
        )}'&service=spotify`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching artwork URL:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        if (artist && title) {
          const artworkResponse = await fetchArtworkUrl(artist, title);
          if (artworkResponse && artworkResponse.results && artworkResponse.results.artwork) {
            setArtworkUrl(artworkResponse.results.artwork);
          } else {
            setArtworkUrl(null);
          }
        }
      } catch (error) {
        console.error('Error fetching artwork:', error);
        setArtworkUrl(null);
      }
    };

    // Fetch artwork initially
    fetchArtwork();

    // Fetch artwork every 10 seconds
    const interval = setInterval(fetchArtwork, 10000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [artist, title]);


  return (
    <>
      {artworkUrl ? (
        <img className='' src={artworkUrl} alt="Song Artwork" />
      ) : (
        <p></p>
      )}
    </>
  );
};

export default ArtworkFetcher;

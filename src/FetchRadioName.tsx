import React, { useState, useEffect } from 'react';

interface IcecastMetadataProps {
  radioUrl: string;
}

const CurrentStation: React.FC<IcecastMetadataProps> = ({ radioUrl }) => {
  const [currentStation, setCurrentStation] = useState('Loading...');

  useEffect(() => {
    const fetchMetadata = () => {
      try {
        // Assuming your favorites data is stored in local storage under the key 'favorites'
        const favoritesData: { name: string; url: string }[] = JSON.parse(localStorage.getItem('favorites') || '[]');

        // Find the station in favorites based on the provided URL
        const station = favoritesData.find((favorite) => favorite.url === radioUrl);

        if (station) {
          setCurrentStation(station.name);
        } else {
          setCurrentStation('Not saved');
        }
      } catch (error) {
        console.error('Error fetching metadata:', error);
        setCurrentStation('Error fetching metadata');
      }
    };

    fetchMetadata();
  }, [radioUrl]);

  return (
    <div className='currentStation'>
      <p>{currentStation}</p>
    </div>
  );
};

export default CurrentStation;

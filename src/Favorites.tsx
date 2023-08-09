import React, { useState, useEffect } from 'react';

interface FavoritesProps {
  setRadioUrl: (url: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ setRadioUrl }) => {
  const initialFavorites: { name: string; url: string }[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );
  const [favorites, setFavorites] = useState<{ name: string; url: string }[]>(initialFavorites);
  const [newStationName, setNewStationName] = useState('');
  const [newStationUrl, setNewStationUrl] = useState('');
  const [showFavoritesPopup, setShowFavoritesPopup] = useState(false);

  useEffect(() => {
    // Save favorites to local storage whenever it changes
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleAddStation = () => {
    if (newStationName && newStationUrl) {
      setFavorites([...favorites, { name: newStationName, url: newStationUrl }]);
      setNewStationName('');
      setNewStationUrl('');
    }
  };

  const handleRemoveStation = (url: string) => {
    const updatedFavorites = favorites.filter((station) => station.url !== url);
    setFavorites(updatedFavorites);
  };

  const handlePasteUrl = (url: string) => {
    setRadioUrl(url);
  };

  return (
    <div className="favorites-container favorites-popup-container">
      <button onClick={() => setShowFavoritesPopup(!showFavoritesPopup)}>
        {showFavoritesPopup ? 'Hide Favorites' : 'Show Favorites'}
      </button>
      {showFavoritesPopup && (
        <div className="favorites-glow favorites-popup">
          <h2>Favorites</h2>
          <ul>
            {favorites.map((station) => (
              <li key={station.url}>
                <span onClick={() => handlePasteUrl(station.url)}>{station.name}</span>
                <button onClick={() => handleRemoveStation(station.url)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="add-station-container">
            <input
              type="text"
              placeholder="Station name"
              value={newStationName}
              onChange={(e) => setNewStationName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Station URL"
              value={newStationUrl}
              onChange={(e) => setNewStationUrl(e.target.value)}
            />
            <button onClick={handleAddStation}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;

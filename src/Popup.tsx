import React from 'react';
import logo from '../src/assets/logo.png';
import './Popup.css';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  const closePopup = () => {
    localStorage.setItem('popupDismissed', 'true');
    onClose();
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <img src={logo} alt="Logo" className="logo" />
        <p>v1.0 RELEASE</p>
        <h1>Welcome to DoogFM - Your Ultimate Online Radio Player!</h1>
        <p>
  <strong>🎶 Introducing DoogFM: Elevate Your Radio Experience 🎶</strong>
</p>
<p>
  Welcome to DoogFM – your ultimate hub for hassle-free internet radio streaming! 📻✨
</p>
<p>
  Imagine a world where you can effortlessly enjoy your favorite internet radio stations with just a few clicks.
  Say goodbye to the endless sites that doesn't let you put custom radio stations – DoogFM has got you covered!
</p>
<p>
  🌟 <strong>Seamless Streaming:</strong> Dive into a world of music from across the globe.
  Enter radio station URLs, and let the melodies transport you to new musical dimensions.
</p>
<p>
  ⭐ <strong>Create Your Playlist:</strong> Love a station? Save it to your personalized favorites list!
  Your preferred tunes are now just a tap away. No more typing, just enjoying.
</p>
<p>
  🎨 <strong>Immersive Experience:</strong> DoogFM is more than just music. It brings the magic of album covers,
  artist names, and song titles to your fingertips. Immerse yourself in the details of your favorite tracks.
</p>
<p>
  🚫 <strong>Ad-Free Pleasure:</strong> We believe in uninterrupted enjoyment.
  DoogFM is free from pesky ads that break the rhythm of your music. Your tunes, your way!
</p>
<p>
  💙 <strong>Support the Beat:</strong> While DoogFM is ad-free, you can still lend a hand by using the code "zerotwo"
  on Salad.com or showing your love on Ko-fi. Every bit helps us keep the music flowing!
</p>
<p>
  Join the DoogFM community today and embark on a musical journey like never before.
  Whether you're discovering new tracks or revisiting old favorites, DoogFM is here to amplify your radio experience.
  Listen, save, and explore – all with the click of a button. 🎧🌐
</p>
<a href="http://www.internet-radio.com">Search For Internet Radio Here! </a>

        <div className="buttons">
          <a href="https://ko-fi.com/yukiokoito">Ko-fi</a>
          <a href="https://github.com/OugiFormula">GitHub</a>
          <a href="https://discord.gg/vEXGQudVcg">Discord</a>
          <a href="https://doog.cool/">Website</a>
        </div>
        <button className="close-button" onClick={closePopup}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;

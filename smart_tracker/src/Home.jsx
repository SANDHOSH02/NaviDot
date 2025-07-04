import { useState } from 'react';
import './index.css';

const soundMap = {
  Keys: '/sounds/key-jingle.mp3',
  Remote: '/sounds/remote-click.mp3',
  Wallet: '/sounds/coin-drop.mp3',
  Laptop: '/sounds/laptop-fan.mp3',
  'Pet Collar': '/sounds/dog-bark.mp3',
  Luggage: '/sounds/suitcase-zip.mp3',
  Glasses: '/sounds/glass-tap.mp3',
  Phone: '/sounds/phone-ring.mp3',
  Bag: '/sounds/fabric-rustle.mp3',
  Folder: '/sounds/paper-shuffle.mp3',
};

const naviDots = [
  { id: 1, name: 'Keys', type: 'With Hole', connected: true, location: '2 meters', icon: 'fa-key' },
  { id: 2, name: 'Remote', type: 'Without Hole', connected: true, location: '2 meters', icon: 'fa fa-television' },
  { id: 3, name: 'Wallet', type: 'With Clip', connected: false, location: 'Unknown', icon: 'fa-wallet' },
  { id: 4, name: 'Laptop', type: 'Without Hole', connected: true, location: '3 meters', icon: 'fa-laptop' },
  { id: 5, name: 'Pet Collar', type: 'With Hole', connected: true, location: '1 meter', icon: 'fa-paw' },
  { id: 6, name: 'Luggage', type: 'With Clip', connected: false, location: 'Unknown', icon: 'fa-suitcase' },
  { id: 7, name: 'Glasses', type: 'Without Hole', connected: true, location: '2 meters', icon: 'fa-glasses' },
  { id: 8, name: 'Phone', type: 'Without Hole', connected: true, location: '6 meters', icon: 'fa-mobile-alt' },
  { id: 9, name: 'Bag', type: 'With Hole', connected: false, location: 'Unknown', icon: 'fa-shopping-bag' },
  { id: 10, name: 'Folder', type: 'With Clip', connected: true, location: '8 meters', icon: 'fa-folder' },
];

function Home() {
  const [selectedBeacon, setSelectedBeacon] = useState(null);
  const [audio, setAudio] = useState(null);

  const handleCardClick = (beacon) => {
    setSelectedBeacon(beacon);
  };

  const closePopup = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setSelectedBeacon(null);
    setAudio(null);
  };

  const triggerSound = (beacon) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    
    const newAudio = new Audio(soundMap[beacon.name]);
    newAudio.play().catch((error) => {
      console.error(`Error playing sound for ${beacon.name}:`, error);
      alert(`Failed to play sound for ${beacon.name}. Please ensure audio files are correctly configured.`);
    });
    setAudio(newAudio);
  };

  return (
    <div className="home">
      <h1>NaviDot Smart Tracker</h1>
      <p>Track your items effortlessly with our offline smart trackers.</p>
      <div className="beacon-grid">
        {naviDots.map((beacon) => (
          <div
            key={beacon.id}
            className={`beacon-card ${beacon.connected ? 'connected' : 'disconnected'}`}
            onClick={() => handleCardClick(beacon)}
          >
            <i className={`fas ${beacon.icon} beacon-icon`}></i>
            <h3>{beacon.name}</h3>
            <p>Type: {beacon.type}</p>
            <p>Status: {beacon.connected ? 'Connected' : 'Disconnected'}</p>
          </div>
        ))}
      </div>

      {selectedBeacon && (
        <div className="popup">
          <div className="popup-content">
            <i className={`fas ${selectedBeacon.icon} popup-icon`}></i>
            <h2>{selectedBeacon.name}</h2>
            <p><strong>Type:</strong> {selectedBeacon.type}</p>
            <p><strong>Status:</strong> {selectedBeacon.connected ? 'Connected' : 'Disconnected'}</p>
            <p><strong>Location:</strong> {selectedBeacon.location}</p>
            {selectedBeacon.connected && (
              <button className="sound-button" onClick={() => triggerSound(selectedBeacon)}>
                Play Sound
              </button>
            )}
            <button className="close-button" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
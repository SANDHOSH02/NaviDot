import { useState } from 'react';
import './index.css';

const echoBeacons = [
  { id: 1, name: 'Keys', type: 'With Hole', connected: true, location: '2 meter' },
  { id: 2, name: 'Remote', type: 'Without Hole', connected: true, location: '2 meter' },
  { id: 3, name: 'Wallet', type: 'With Clip', connected: false, location: 'Unknown' },
  { id: 4, name: 'Laptop', type: 'Without Hole', connected: true, location: '3 meter' },
  { id: 5, name: 'Pet Collar', type: 'With Hole', connected: true, location: '1 meter' },
  { id: 6, name: 'Luggage', type: 'With Clip', connected: false, location: 'Unknown' },
  { id: 7, name: 'Glasses', type: 'Without Hole', connected: true, location: '2 meter' },
  { id: 8, name: 'Phone', type: 'Without Hole', connected: true, location: '6 meter' },
  { id: 9, name: 'Bag', type: 'With Hole', connected: false, location: 'Unknown' },
  { id: 10, name: 'Folder', type: 'With Clip', connected: true, location: '8 meter' },
];

function Home() {
  const [selectedBeacon, setSelectedBeacon] = useState(null);

  const handleCardClick = (beacon) => {
    setSelectedBeacon(beacon);
  };

  const closePopup = () => {
    setSelectedBeacon(null);
  };

  const triggerSound = (beacon) => {
    alert(`Triggering sound for ${beacon.name}...`);
    
  };

  return (
    <div className="home">
      <h1>NaviDot Smart Tracker</h1>
      <p>Track your items effortlessly with our offline  smart trackers.</p>
      <div className="beacon-grid">
        {echoBeacons.map((beacon) => (
          <div
            key={beacon.id}
            className={`beacon-card ${beacon.connected ? 'connected' : 'disconnected'}`}
            onClick={() => handleCardClick(beacon)}
          >
            <h3>{beacon.name}</h3>
            <p>Type: {beacon.type}</p>
            <p>Status: {beacon.connected ? 'Connected' : 'Disconnected'}</p>
          </div>
        ))}
      </div>

      {selectedBeacon && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selectedBeacon.name}</h2>
            <p><strong>Type:</strong> {selectedBeacon.type}</p>
            <p><strong>Status:</strong> {selectedBeacon.connected ? 'Connected' : 'Disconnected'}</p>
            <p><strong>Location:</strong> {selectedBeacon.location}</p>
            {selectedBeacon.connected && (
              <button className="sound-button" onClick={() => triggerSound(selectedBeacon)}>
                Use Sound
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
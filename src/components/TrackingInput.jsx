import React, { useState } from 'react';

const TrackingInput = ({ onTrack }) => {
  const [trackingId, setTrackingId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      onTrack(trackingId.trim());
    }
  };

  return (
    <form className="tracking-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Tracking ID (e.g., RYZ-456789)"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        className="tracking-input"
      />
      <button type="submit" className="track-btn">Track Order →</button>
    </form>
  );
};

export default TrackingInput;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocations } from '../LocationsContext';
import './LocationScreen.css';

export default function LocationScreen({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { locations, setLocations } = useLocations();

  // Find the specific location
  const [location, setLocation] = useState(
    locations.find(loc => loc.id === parseInt(id))
  );

  const [selectedReading, setSelectedReading] = useState('swimmable');

  const submitReading = () => {
    const newReading = {
      type: selectedReading,
      timestamp: new Date().toISOString(),
      user: user.username
    };

    // Update locations in context
    setLocations(prevLocations => 
      prevLocations.map(loc => 
        loc.id === parseInt(id) 
          ? {...loc, readings: [newReading, ...loc.readings]} 
          : loc
      )
    );

    navigate('/');
  };

  return (
    <div className="location-detail-container">
      <h2>{location.name}</h2>
      
      <section className="recent-readings">
        <h3>Recent Readings:</h3>
        {location.readings.slice(0, 5).map((reading, index) => (
          <div key={index} className="reading-item">
            <p>Type: {reading.type}</p>
            <p>By: {reading.user}</p>
            <p>Date: {new Date(reading.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </section>

      {user.role === 'verifier' && (
        <section className="add-reading">
          <h3>Add New Reading:</h3>
          <select 
            value={selectedReading}
            onChange={(e) => setSelectedReading(e.target.value)}
          >
            <option value="drinkable">Drinkable</option>
            <option value="boilable">Boilable</option>
            <option value="swimmable">Swimmable</option>
            <option value="unswimmable">Unswimmable</option>
          </select>
          <button onClick={submitReading}>Submit Reading</button>
        </section>
      )}
    </div>
  );
}
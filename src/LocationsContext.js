import React, { createContext, useState, useContext } from 'react';

// Updated initial locations data with specific coordinates
const initialLocations = [
  {
    id: 1,
    name: 'Lake St. Clair Metropolitan Park',
    latitude: 42.4708, // Coordinates for Lake St. Clair Metropolitan Park
    longitude: -82.8803,
    readings: [{ type: 'swimmable', timestamp: new Date().toISOString(), user: 'admin' }]
  },
  {
    id: 2,
    name: 'Detroit River',
    latitude: 42.3314, // Coordinates for Detroit River (approximate central point)
    longitude: -83.0458,
    readings: [{ type: 'boilable', timestamp: new Date().toISOString(), user: 'admin' }]
  }
];

const LocationsContext = createContext();

export const LocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState(initialLocations);

  return (
    <LocationsContext.Provider value={{ locations, setLocations }}>
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocations = () => {
  const context = useContext(LocationsContext);
  if (!context) {
    throw new Error('useLocations must be used within a LocationsProvider');
  }
  return context;
};
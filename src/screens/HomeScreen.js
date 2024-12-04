import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Link, useLocation } from 'react-router-dom';
import { useLocations } from '../LocationsContext';
import './HomeScreen.css';

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 42.3314, // Detroit area center
  lng: -83.0458
};

const libraries = ['places'];

export default function HomeScreen({ user }) {
  const location = useLocation();
  const { locations } = useLocations();

  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  // Log any load errors
  useEffect(() => {
    if (loadError) {
      console.error('Google Maps load error:', {isLoaded, loadError});
    }
  }, [isLoaded, loadError]);

  const getMarkerColor = (readingType) => {
    switch(readingType) {
      case 'swimmable': return 'green';
      case 'boilable': return 'yellow';
      case 'unswimmable': return 'red';
      default: return 'blue';
    }
  };

  useEffect(() => {
    setSelectedMarker(null);
  }, [location.pathname]);

  if (loadError) {
    console.error('Google Maps load error:', loadError);
    return (
      <div>
        <h2>Error Loading Google Maps</h2>
        <pre>{JSON.stringify(loadError, null, 2)}</pre>
      </div>
    );
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <div className="home-layout">
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={9}
        >
          {locations.map(location => (
            <Marker
              key={location.id}
              position={{
                lat: location.latitude,
                lng: location.longitude
              }}
              icon={{
                url: `http://maps.google.com/mapfiles/ms/icons/${getMarkerColor(location.readings[0].type)}-dot.png`
              }}
              onClick={() => setSelectedMarker(location)}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.latitude,
                lng: selectedMarker.longitude
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h3>{selectedMarker.name}</h3>
                <p>Latest Reading: {selectedMarker.readings[0].type}</p>
                <Link to={`/location/${selectedMarker.id}`}>
                  View Details
                </Link>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      <div className="location-list">
        {locations.map(location => (
          <div key={location.id} className="location-card">
            <h3>{location.name}</h3>
            <p>Latest Reading: {location.readings[0].type}</p>
            <Link 
              to={`/location/${location.id}`} 
              className="details-btn"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
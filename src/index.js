import React from 'react';
import ReactDOM from 'react-dom/client';
import { LoadScript } from '@react-google-maps/api';
import { LocationsProvider } from './LocationsContext';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoadScript 
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      loadingElement={<div>Loading Maps...</div>}
    >
      <LocationsProvider>
        <App />
      </LocationsProvider>
    </LoadScript>
  </React.StrictMode>
);


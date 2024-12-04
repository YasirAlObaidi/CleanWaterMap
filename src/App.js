import React, { useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import { LocationsProvider } from './LocationsContext';
import HomeScreen from './screens/HomeScreen';
import LocationScreen from './screens/LocationScreen';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Simple login function
  const login = (username, password) => {
    const users = [
      { username: 'admin', password: 'admin', role: 'verifier' },
      { username: 'user', password: 'user', role: 'normal' }
    ];

    const foundUser = users.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        {user ? (
          <div className="app-container">
            <nav>
              <div className="nav-content">
                <Link to="/" className="nav-title">Water Quality Map</Link>
                <button onClick={logout} className="logout-btn">Logout</button>
              </div>
            </nav>
            <Routes>
              <Route 
                path="/" 
                element={<HomeScreen user={user} />} 
              />
              <Route 
                path="/location/:id" 
                element={<LocationScreen user={user} />} 
              />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route 
              path="/" 
              element={<LoginScreen onLogin={login} />} 
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Signup from './components/Signup';
import Navbar from './components/navbar';

const App = () => {
  const location = useLocation();

  const showNavbar = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <div>

      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;

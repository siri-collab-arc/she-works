import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ProviderNavBar.css';

const BASE_URL = "http://localhost:5000";

// Helper to build image URLs
const getFullImageURL = (path) => {
  if (!path || path === "") {
    return "https://via.placeholder.com/32";
  }
  if (path.startsWith("http")) {
    return path;
  }
  return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

const ProviderNavBar = () => {
  const location = useLocation();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user && user.id) {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${BASE_URL}/api/auth/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setProfileData(response.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const navItems = [
    {
      path: '/provider/dashboard',
      icon: '🏠',
      label: 'Dashboard'
    },
    {
      path: '/provider/ProviderProfileView',
      icon: '👤',
      label: 'Profile'
    },
    {
      path: '/provider/ManageBookings',
      icon: '📅',
      label: 'Bookings'
    },
    {
      path: '/provider/ProviderChat',
      icon: '💬',
      label: 'Messages'
    },
    {
      path: '/provider/settings',
      icon: '⚙️',
      label: 'Settings'
    }
  ];

  return (
    <nav className="provider-nav">
      <div className="nav-content">
        <Link to="/provider/dashboard" className="nav-brand">
          SheWorks
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="nav-profile">
          <img
            src={profileData ? getFullImageURL(profileData.profileImage) : 'https://via.placeholder.com/32'}
            alt={profileData?.name || 'Profile'}
            className="nav-profile-pic"
          />
          <span className="nav-profile-name">{profileData?.name || 'Loading...'}</span>
        </div>
      </div>
    </nav>
  );
};

export default ProviderNavBar;
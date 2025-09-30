import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProviderDashboard.css';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const menuItems = [
    {
      title: 'My Profile',
      icon: '👤',
      description: 'View and edit your profile',
      link: '/provider/ProviderProfileView'
    },
    {
      title: 'Manage Bookings',
      icon: '📅',
      description: 'View and manage service bookings',
      link: '/provider/ManageBookings'
    },
    {
      title: 'Messages',
      icon: '💬',
      description: 'Chat with your clients',
      link: '/provider/ProviderChat'
    },
    {
      title: 'Reviews',
      icon: '⭐',
      description: 'View client reviews and ratings',
      link: '/provider/reviews'
    },
    {
      title: 'Earnings',
      icon: '💰',
      description: 'Track your earnings and payments',
      link: '/provider/earnings'
    },
    {
      title: 'Settings',
      icon: '⚙️',
      description: 'Account settings and preferences',
      link: '/provider/settings'
    }
  ];

  return (
    <div className="provider-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Welcome, {user.name}! 👋</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout 🚪
          </button>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Today's Bookings</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Total Earnings</h3>
          <p className="stat-number">₹0</p>
        </div>
        <div className="stat-card">
          <h3>Rating</h3>
          <p className="stat-number">⭐ 0.0</p>
        </div>
        <div className="stat-card">
          <h3>Completed Services</h3>
          <p className="stat-number">0</p>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="menu-card"
            onClick={() => navigate(item.link)}
          >
            <div className="menu-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderDashboard;
// src/components/client/ClientProfilePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientProfilePage.css";
import axios from 'axios';

const backendLogout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;
    await axios.post('http://localhost:5000/api/auth/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (err) {
    // ignore errors - endpoint may not exist or network issues
    console.warn('Backend logout failed or not available', err?.response?.data || err.message);
  }
};

const ClientProfilePage = () => {
  const navigate = useNavigate();

  const [user] = useState({
    name: "Demo Client",
    email: "demo@example.com",
    profilePic: "/assets/default-profile.png",
    orders: [
      { id: 1, service: "Hand Embroidery", status: "In Progress" },
      { id: 2, service: "South Indian Meals", status: "Delivered" },
    ],
    favorites: [
      { id: 1, name: "Bridal Makeup" },
      { id: 2, name: "Handmade Gifts" },
    ],
    chats: [
      { id: 1, provider: "Anita Tailor" },
      { id: 2, provider: "Meera Caterer" },
    ],
  });

  const handleEditProfile = () => {
    navigate("/client/edit-profile");
  };

  const handleLogout = () => {
    // show confirmation
    setShowConfirm(true);
  };

  const doLogout = async () => {
    await backendLogout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    try { localStorage.removeItem('cart'); } catch (e) {}
    navigate('/login');
  };

  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="client-profile-container">
      {/* Profile Section */}
      <div className="profile-header">
        <div className="profile-details">
          <img
            src={user.profilePic}
            alt="Profile"
            className="profile-large"
          />
          <div>
            <h2>{user.name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Total Orders:</strong> {user.orders.length}</p>
          </div>
        </div>
        <button className="edit-profile-btn" onClick={handleEditProfile}>
          ✏️ Edit Profile
        </button>
      </div>

      {/* Favorites Section */}
      <div className="profile-section">
        <h3>❤️ My Favorites</h3>
        {user.favorites.length > 0 ? (
          <ul>
            {user.favorites.map((fav) => (
              <li key={fav.id}>{fav.name}</li>
            ))}
          </ul>
        ) : (
          <p>No favorites added yet.</p>
        )}
      </div>

      {/* Orders Section */}
      <div className="profile-section">
        <h3>📦 My Orders</h3>
        {user.orders.length > 0 ? (
          <ul>
            {user.orders.map((order) => (
              <li key={order.id}>
                {order.service} - <span className="status">{order.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </div>

      {/* Chat History Section */}
      <div className="profile-section">
        <h3>💬 Chat History</h3>
        {user.chats.length > 0 ? (
          <ul>
            {user.chats.map((chat) => (
              <li key={chat.id}>Chatted with {chat.provider}</li>
            ))}
          </ul>
        ) : (
          <p>No chats yet.</p>
        )}
      </div>

      {/* 🔹 Logout Button */}
      <div className="logout-btn-container">
        <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
      </div>
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>Are you sure you want to logout?</p>
            <div className="confirm-actions">
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
              <button onClick={async () => { await doLogout(); }}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientProfilePage;

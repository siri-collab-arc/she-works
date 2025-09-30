import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProviderSettings.css';

const BASE_URL = "http://localhost:5000";

const ProviderSettings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      booking: true,
      messages: true
    },
    privacy: {
      showEmail: false,
      showPhone: false,
      showLocation: true
    },
    password: {
      current: '',
      new: '',
      confirm: ''
    }
  });

  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/api/auth/settings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data) {
          setSettings(prevSettings => ({
            ...prevSettings,
            ...response.data
          }));
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        showNotification('Failed to load settings', 'error');
      }
    };

    fetchSettings();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handlePrivacyChange = (key) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      password: {
        ...prev.password,
        [name]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${BASE_URL}/api/auth/settings`,
        settings,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      showNotification('Settings saved successfully', 'success');
    } catch (error) {
      console.error('Error saving settings:', error);
      showNotification('Failed to save settings', 'error');
    }
  };

  const handleChangePassword = async () => {
    try {
      if (settings.password.new !== settings.password.confirm) {
        showNotification('New passwords do not match', 'error');
        return;
      }

      const token = localStorage.getItem('token');
      await axios.put(
        `${BASE_URL}/api/auth/change-password`,
        {
          currentPassword: settings.password.current,
          newPassword: settings.password.new
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setSettings(prev => ({
        ...prev,
        password: { current: '', new: '', confirm: '' }
      }));
      showNotification('Password changed successfully', 'success');
    } catch (error) {
      console.error('Error changing password:', error);
      showNotification('Failed to change password', 'error');
    }
  };

  return (
    <div className="settings-container">
      <h2>Account Settings</h2>

      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <section className="settings-section">
        <h3>Notifications</h3>
        <div className="settings-options">
          <label>
            <input
              type="checkbox"
              checked={settings.notifications.email}
              onChange={() => handleNotificationChange('email')}
            />
            Email Notifications
          </label>
          <label>
            <input
              type="checkbox"
              checked={settings.notifications.push}
              onChange={() => handleNotificationChange('push')}
            />
            Push Notifications
          </label>
          <label>
            <input
              type="checkbox"
              checked={settings.notifications.booking}
              onChange={() => handleNotificationChange('booking')}
            />
            Booking Updates
          </label>
          <label>
            <input
              type="checkbox"
              checked={settings.notifications.messages}
              onChange={() => handleNotificationChange('messages')}
            />
            Message Notifications
          </label>
        </div>
      </section>

      <section className="settings-section">
        <h3>Privacy</h3>
        <div className="settings-options">
          <label>
            <input
              type="checkbox"
              checked={settings.privacy.showEmail}
              onChange={() => handlePrivacyChange('showEmail')}
            />
            Show Email to Clients
          </label>
          <label>
            <input
              type="checkbox"
              checked={settings.privacy.showPhone}
              onChange={() => handlePrivacyChange('showPhone')}
            />
            Show Phone Number to Clients
          </label>
          <label>
            <input
              type="checkbox"
              checked={settings.privacy.showLocation}
              onChange={() => handlePrivacyChange('showLocation')}
            />
            Show Location to Clients
          </label>
        </div>
      </section>

      <section className="settings-section">
        <h3>Change Password</h3>
        <div className="password-fields">
          <input
            type="password"
            name="current"
            value={settings.password.current}
            onChange={handlePasswordChange}
            placeholder="Current Password"
          />
          <input
            type="password"
            name="new"
            value={settings.password.new}
            onChange={handlePasswordChange}
            placeholder="New Password"
          />
          <input
            type="password"
            name="confirm"
            value={settings.password.confirm}
            onChange={handlePasswordChange}
            placeholder="Confirm New Password"
          />
          <button onClick={handleChangePassword}>Change Password</button>
        </div>
      </section>

      <div className="settings-actions">
        <button onClick={handleSaveSettings} className="save-button">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default ProviderSettings;
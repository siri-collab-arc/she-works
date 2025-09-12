// src/pages/provider/ProviderProfileView.jsx

/*import React from 'react';
import './ProviderProfileView.css';
import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const mockProfile = {
  name: 'Anjali Sharma',
  service: 'Embroidery',
  bio: 'Passionate about traditional embroidery with 5+ years of experience.',
  contact: 'anjali@example.com',
  images: ['/images/work-0.jpg', '/images/work-1.jpg'],
  bookings: [
    { client: 'Meera S.', date: '2025-07-15', status: 'Completed' },
    { client: 'Divya M.', date: '2025-07-21', status: 'Upcoming' }
  ],
  reviews: [
    { client: 'Riya Verma', rating: 5, feedback: 'Absolutely loved her work!' },
    { client: 'Neha Das', rating: 4, feedback: 'Very professional and neat.' }
  ]
};

const ProviderProfileView = () => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/provider/EditProviderProfile'); // ✅ Navigate to the edit profile page
  };

  return (
    <div className="provider-profile-view">
      <div className="profile-header">
        <h2>{mockProfile.name}</h2>
        <motion.button className="edit-button" whileTap={{ scale: 0.95 }} onClick={handleEdit}>
          Edit Profile
        </motion.button>
      </div>

      <div className="profile-section">
        <h3 className="section-title">About</h3>
        <div className="profile-details">
          <p><strong>Service:</strong> {mockProfile.service}</p>
          <p>{mockProfile.bio}</p>
          <p><strong>Contact:</strong> {mockProfile.contact}</p>
        </div>
      </div>

      <div className="profile-section">
        <h3 className="section-title">Portfolio</h3>
        <div className="image-gallery">
          {mockProfile.images.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`work-${i}`}
              className="gallery-image"
              whileHover={{ scale: 1.08 }}
            />
          ))}
        </div>
      </div>

      <div className="profile-section">
        <h3 className="section-title">Client Bookings</h3>
        {mockProfile.bookings.map((b, i) => (
          <motion.div key={i} className="booking-card" whileHover={{ scale: 1.03 }}>
            <p><strong>{b.client}</strong> - {b.date} <em>({b.status})</em></p>
          </motion.div>
        ))}
      </div>

      <div className="profile-section">
        <h3 className="section-title">Client Reviews & Ratings</h3>
        {mockProfile.reviews.map((r, i) => (
          <motion.div key={i} className="review-card" whileHover={{ scale: 1.03 }}>
            <p><strong>{r.client}</strong> - <span className="rating-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span></p>
            <p>{r.feedback}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProviderProfileView;*/

/*import React, { useState } from 'react';
import './ProviderProfileView.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const mockProfile = {
  name: 'Anjali Sharma',
  service: 'Embroidery',
  bio: 'Passionate about traditional embroidery with 5+ years of experience.',
  contact: 'anjali@example.com',
  images: ['/images/work-0.jpg', '/images/work-1.jpg'],
  bookings: [
    { client: 'Meera S.', date: '2025-07-15', status: 'Completed' },
    { client: 'Divya M.', date: '2025-07-21', status: 'Upcoming' }
  ],
  reviews: [
    { client: 'Riya Verma', rating: 5, feedback: 'Absolutely loved her work!' },
    { client: 'Neha Das', rating: 4, feedback: 'Very professional and neat.' }
  ]
};

const ProviderProfileView = () => {
  const navigate = useNavigate();
  const [portfolioImages, setPortfolioImages] = useState(mockProfile.images);

  const handleEdit = () => {
    navigate('/provider/EditProviderProfile');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setPortfolioImages(prev => [...prev, ...newImages]);
  };

  return (
    <div className="provider-profile-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <motion.button
          className="upload-button"
          onClick={handleBack}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>

        <motion.button
          className="upload-button"
          onClick={handleEdit}
          whileTap={{ scale: 0.95 }}
        >
          Edit Profile
        </motion.button>
      </div>

      <div className="profile-header">
        <h2>{mockProfile.name}</h2>
      </div>

      <div className="profile-section">
        <h3 className="section-title">About</h3>
        <div className="profile-details">
          <p><strong>Service:</strong> {mockProfile.service}</p>
          <p>{mockProfile.bio}</p>
          <p><strong>Contact:</strong> {mockProfile.contact}</p>
        </div>
      </div>

      <div className="profile-section">
        <div className="section-header-with-upload">
          <h3 className="section-title">Portfolio</h3>
          <label className="upload-button">
            Upload Work
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
          </label>
        </div>
        <div className="image-gallery">
          {portfolioImages.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`work-${i}`}
              className="gallery-image"
              whileHover={{ scale: 1.08 }}
            />
          ))}
        </div>
      </div>

      <div className="profile-section">
        <h3 className="section-title">Client Bookings</h3>
        {mockProfile.bookings.map((b, i) => (
          <motion.div key={i} className="booking-card" whileHover={{ scale: 1.03 }}>
            <p><strong>{b.client}</strong> - {b.date} <em>({b.status})</em></p>
          </motion.div>
        ))}
      </div>

      <div className="profile-section">
        <h3 className="section-title">Client Reviews & Ratings</h3>
        {mockProfile.reviews.map((r, i) => (
          <motion.div key={i} className="review-card" whileHover={{ scale: 1.03 }}>
            <p><strong>{r.client}</strong> - <span className="rating-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span></p>
            <p>{r.feedback}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProviderProfileView;*/



import React, { useState } from 'react';
import './ProviderProfileView.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const mockProfile = {
  name: 'Anjali Sharma',
  service: 'Embroidery',
  bio: 'Passionate about traditional embroidery with 5+ years of experience.',
  contact: 'anjali@example.com',
  images: ['/images/work-0.jpg', '/images/work-1.jpg'],
  bookings: [
    { client: 'Meera S.', date: '2025-07-15', status: 'Completed' },
    { client: 'Divya M.', date: '2025-07-21', status: 'Upcoming' }
  ],
  reviews: [
    { client: 'Riya Verma', rating: 5, feedback: 'Absolutely loved her work!' },
    { client: 'Neha Das', rating: 4, feedback: 'Very professional and neat.' }
  ]
};

const ProviderProfileView = () => {
  const navigate = useNavigate();
  const [portfolioImages, setPortfolioImages] = useState(mockProfile.images);

  const handleEdit = () => {
    navigate('/provider/EditProviderProfile');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleManageBookings = () => {
    navigate('/provider/ManageBookings');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setPortfolioImages(prev => [...prev, ...newImages]);
  };

  return (
    <div className="provider-profile-view">
      {/* Top Buttons Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', gap: '10px' }}>
        <motion.button
          className="upload-button"
          onClick={handleBack}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>

        <motion.button
          className="upload-button"
          onClick={handleEdit}
          whileTap={{ scale: 0.95 }}
        >
          Edit Profile
        </motion.button>

        <motion.button
          className="upload-button"
          onClick={handleManageBookings}
          whileTap={{ scale: 0.95 }}
        >
          Manage Bookings
        </motion.button>
      </div>

      {/* Profile Header */}
      <div className="profile-header">
        <h2>{mockProfile.name}</h2>
      </div>

      {/* About Section */}
      <div className="profile-section">
        <h3 className="section-title">About</h3>
        <div className="profile-details">
          <p><strong>Service:</strong> {mockProfile.service}</p>
          <p>{mockProfile.bio}</p>
          <p><strong>Contact:</strong> {mockProfile.contact}</p>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="profile-section">
        <div className="section-header-with-upload">
          <h3 className="section-title">Portfolio</h3>
          <label className="upload-button">
            Upload Work
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
          </label>
        </div>
        <div className="image-gallery">
          {portfolioImages.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`work-${i}`}
              className="gallery-image"
              whileHover={{ scale: 1.08 }}
            />
          ))}
        </div>
      </div>

      {/* Bookings Section */}
      <div className="profile-section">
        <h3 className="section-title">Client Bookings</h3>
        {mockProfile.bookings.map((b, i) => (
          <motion.div key={i} className="booking-card" whileHover={{ scale: 1.03 }}>
            <p><strong>{b.client}</strong> - {b.date} <em>({b.status})</em></p>
          </motion.div>
        ))}
      </div>

      {/* Reviews Section */}
      <div className="profile-section">
        <h3 className="section-title">Client Reviews & Ratings</h3>
        {mockProfile.reviews.map((r, i) => (
          <motion.div key={i} className="review-card" whileHover={{ scale: 1.03 }}>
            <p>
              <strong>{r.client}</strong> - 
              <span className="rating-stars">
                {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
              </span>
            </p>
            <p>{r.feedback}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProviderProfileView;

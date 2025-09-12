// src/pages/client/ProviderProfileC.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProviderProfileC.css';
import { motion } from 'framer-motion';
import ClientProfileIcon from './ClientProfileIcon';

const ProviderProfileC = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const dummyProvider = {
      id: providerId,
      name: 'Anita Sharma',
      service: 'Embroidery',
      location: 'Mumbai',
      description: 'Experienced embroidery artist specializing in traditional patterns.',
      image: '/assets/ServiceProviderImages/Embriodery1.jpeg',
    };
    setProvider(dummyProvider);

    const storedReviews = JSON.parse(localStorage.getItem(`reviews_${providerId}`)) || [];
    setReviews(storedReviews);
  }, [providerId]);

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 'No ratings yet';

  if (!provider) return <div>Loading...</div>;

  return (
    <motion.div
      className="provider-profile-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
      <ClientProfileIcon />
    
      </div>
      <div className="profile-card">
        <img src={provider.image} alt={provider.name} className="provider-image" />
        <div className="provider-info">
          <h2>{provider.name}</h2>
          <p><strong>Service:</strong> {provider.service}</p>
          <p><strong>Location:</strong> {provider.location}</p>
          <p>{provider.description}</p>
          <p><strong>⭐ Avg Rating:</strong> {averageRating}</p>

          <div className="buttons">
            <button className="book-btn" onClick={() => navigate(`/client/book/${providerId}`)}>
              📅 Book Service
            </button>
            <button className="chat-btn" onClick={() => navigate(`/client/chat/${providerId}`)}>
              💬 Chat with Provider
            </button>
            <button className="write-review-btn" onClick={() => navigate(`/client/writereview/${providerId}`)}>
              ✍️ Write a Review
            </button>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h3>Client Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <motion.div
              key={index}
              className="review-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p><strong>{review.name}</strong> — ⭐ {review.rating}</p>
              <p>{review.comment}</p>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default ProviderProfileC;

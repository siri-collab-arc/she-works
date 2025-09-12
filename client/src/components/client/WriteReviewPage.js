// src/pages/client/WriteReviewPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './WriteReviewPage.css';
import ClientProfileIcon from './ClientProfileIcon';

function WriteReviewPage() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({ rating: '', comment: '' });

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Review submitted successfully!');
    // TODO: send to backend with providerId
    navigate(`/client/provider/${providerId}`);
  };

  return (
    <div className="write-review-container">
      <div>
            <ClientProfileIcon />
            
            </div>
      <div className="review-card">
        <h2>Write a Review for <span className="highlight">Provider {providerId}</span></h2>
        <form onSubmit={handleSubmit}>
          <label>Rating:</label>
          <select name="rating" value={review.rating} onChange={handleChange} required>
            <option value="">Select rating</option>
            <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
            <option value="4">⭐⭐⭐⭐ Good</option>
            <option value="3">⭐⭐⭐ Average</option>
            <option value="2">⭐⭐ Below Average</option>
            <option value="1">⭐ Poor</option>
          </select>

          <label>Comment:</label>
          <textarea
            name="comment"
            value={review.comment}
            onChange={handleChange}
            placeholder="Write your feedback..."
            required
          />

          <button type="submit" className="submit-review-btn">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default WriteReviewPage;

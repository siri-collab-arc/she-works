import React, { useState } from "react";
import "./ProviderProfileView.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// Mock data (replace with backend later)
const mockProfile = {
  name: "Anjali Sharma",
  service: "Embroidery",
  subservices: ["Hand Embroidery", "Custom Designs"],
  bio: "Passionate about traditional embroidery with 5+ years of experience.",
  contact: "9876543210",
  email: "anjali@example.com",
  profilePic: "/assets/ServiceProviderImages/Embriodery1.jpeg",
  images: ["/images/work-0.jpg", "/images/work-1.jpg"],
  bookings: [
    { client: "Meera S.", date: "2025-07-15", status: "Completed" },
    { client: "Divya M.", date: "2025-07-21", status: "Upcoming" },
  ],
  reviews: [
    { client: "Riya Verma", rating: 5, feedback: "Absolutely loved her work!" },
    { client: "Neha Das", rating: 4, feedback: "Very professional and neat." },
  ],
};

const ProviderProfileView = () => {
  const navigate = useNavigate();
  const [portfolioImages, setPortfolioImages] = useState(mockProfile.images);

  const handleEdit = () => {
    navigate("/provider/EditProviderProfile");
  };

  const handleManageBookings = () => {
    navigate("/provider/ManageBookings");
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setPortfolioImages((prev) => [...prev, ...newImages]);
  };

  return (
    <div className="provider-profile-view">
      {/* Profile Header with Image + Info + Buttons */}
      <div className="profile-header">
        {/* Left: Image */}
        <div className="profile-header-left">
          <img
            src={mockProfile.profilePic}
            alt={`${mockProfile.name}'s profile`}
            className="profile-pic-circle"
          />
        </div>

        {/* Right: Name + Buttons */}
        <div className="profile-header-right">
          <h2>{mockProfile.name}</h2>

          <div className="profile-actions">
            <motion.button
              className="upload-button"
              onClick={handleEdit}
              whileTap={{ scale: 0.95 }}
            >
              ✏️ Edit Profile
            </motion.button>

            <motion.button
              className="upload-button"
              onClick={handleManageBookings}
              whileTap={{ scale: 0.95 }}
            >
              📅 Manage Bookings
            </motion.button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="profile-section">
        <h3 className="section-title">About</h3>
        <div className="profile-details-vertical">
          <div className="detail-item">
            <span className="detail-label">🎨 Service:</span>
            <span className="detail-value">{mockProfile.service}</span>
          </div>
          {mockProfile.subservices?.length > 0 && (
            <div className="detail-item">
              <span className="detail-label">🎯 Specialized In:</span>
              <span className="detail-value">
                {mockProfile.subservices.join(", ")}
              </span>
            </div>
          )}
          <div className="detail-item">
            <span className="detail-label">📝 Bio:</span>
            <span className="detail-value">{mockProfile.bio}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">📞 Contact:</span>
            <span className="detail-value">{mockProfile.contact}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">✉️ Email:</span>
            <span className="detail-value">{mockProfile.email}</span>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="profile-section">
        <div className="section-header-with-upload">
          <h3 className="section-title">Portfolio</h3>
          <label className="upload-button">
            Upload Work
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
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
          <motion.div
            key={i}
            className="booking-card"
            whileHover={{ scale: 1.03 }}
          >
            <p>
              <strong>{b.client}</strong> - {b.date} <em>({b.status})</em>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Reviews Section */}
      <div className="profile-section">
        <h3 className="section-title">Client Reviews & Ratings</h3>
        {mockProfile.reviews.map((r, i) => (
          <motion.div
            key={i}
            className="review-card"
            whileHover={{ scale: 1.03 }}
          >
            <p>
              <strong>{r.client}</strong> -{" "}
              <span className="rating-stars">
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
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

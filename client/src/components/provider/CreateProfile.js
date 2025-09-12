// src/pages/provider/CreateProfile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProfile.css';

function CreateProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    bio: '',
    contact: '',
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, images: files }));

    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ideally send formData to backend here
    console.log('Submitted Profile:', formData);

    // Navigate to provider profile view
    navigate('/provider/ProviderProfileView');
  };

  return (
    <div className="create-profile-container">
      <h2>Create Your Service Provider Profile</h2>
      <form className="create-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Service Offered</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            
            <option value="Embroidery">Embroidery</option>
            <option value="Home-Cooked Food">Home-Cooked Food</option>
            <option value="Gift Packing">Custom Gifts</option>
            <option value="Gift Packing">Arts & Crafts</option>
            <option value="Gift Packing">Fashion & Tailoring</option>
            <option value="Gift Packing">Beauty & Wellness</option>
            <option value="Gift Packing">Tutoring & Education</option>
            <option value="Gift Packing">Event Decoration</option>
            <option value="Gift Packing">Home Gardening Kits</option>
            <option value="Gift Packing">Traditional Festival Kits</option>
          </select>
        </div>

        <div className="form-group">
          <label>Bio / Description</label>
          <textarea
            name="bio"
            placeholder="Tell us about your skills, experience, and passion..."
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Info (Phone/Email)</label>
          <input
            name="contact"
            type="text"
            placeholder="example@email.com or phone number"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Profile Pic (Images)</label>
          <input
            name="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          {previewImages.length > 0 && (
            <div className="image-preview-container">
              {previewImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`preview-${index}`}
                  className="preview-image"
                />
              ))}
            </div>
          )}
        </div>

        <button type="submit">🚀 Submit Profile</button>
      </form>
    </div>
  );
}

export default CreateProfile;

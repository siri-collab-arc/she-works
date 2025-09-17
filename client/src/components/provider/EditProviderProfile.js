// src/pages/provider/EditProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProviderProfile.css";

// Mock existing provider data (replace later with backend fetch)
const existingProfile = {
  name: "Anjali Sharma",
  service: "Embroidery",
  subservices: ["Hand Embroidery", "Custom Designs"],
  bio: "Passionate about traditional embroidery with 5+ years of experience.",
  contact: "9876543210",
  email: "anjali@example.com",
  images: [], // initially empty, will handle preview if user uploads
};

function EditProviderProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(existingProfile);
  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState({});

  // Services with subservices
  const servicesWithSub = {
    Embroidery: [
      "Hand Embroidery",
      "Machine Embroidery",
      "Pearl Embriodery",
      "Beads Embroidery",
      "Free Style Embroidery",
    ],
    "Home-Cooked Food": [
      "South Indian Meals",
      "North Indian Meals",
      "Snacks",
      "Sweets",
    ],
    "Custom Gifts": [
      "Handmade Gifts",
      "Birthday Gifts",
      "Wedding Gifts",
      "Anniversary Gifts",
    ],
    "Arts & Crafts": [
      "Paintings",
      "Paper Crafting",
      "Clay modelling",
      "Collage Making",
      "Handmade Decor",
    ],
    "Fashion & Tailoring": [
      "Ladies Wear",
      "Mens wear",
      "Kids wear",
      "Ethnic Wear",
    ],
    "Beauty & Wellness": [
      "Bridal Makeup",
      "Skincare",
      "Hair care",
      "Manicure & Pedicure",
      "Full Body Massage",
      "Mehendi",
    ],
    "Tutoring & Education": [
      "Math Coaching",
      "Language Classes",
      "Handwriting",
      "Music Lessons",
    ],
    "Event Decoration": [
      "Birthday Decor",
      "Wedding Decor",
      "Festive Decor",
      "Anniversary Decor",
      "Corporate Event Decor",
    ],
    "Home Gardening Kits": [
      "Indoor Plants",
      "Plant Kit",
      "Herb Kit",
      "Vegetable Kit",
      "Flower Kit",
      "Microgreen Kit",
    ],
    "Traditional Festival Kits": [
      "Pooja Kits",
      "Festival Essentials",
      "Holi Festival Kit",
      "Diwali Festival Kit",
      "ganapathi Festival Kit",
      "Festive Delight Craft",
      "Lotus Puja decor kit",
    ],
  };

  useEffect(() => {
    // Preload any existing images if available
    if (existingProfile.images.length > 0) {
      const previews = existingProfile.images.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages(previews);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubserviceChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      let updatedSubs = [...prev.subservices];
      if (checked) {
        updatedSubs.push(value);
      } else {
        updatedSubs = updatedSubs.filter((s) => s !== value);
      }
      return { ...prev, subservices: updatedSubs };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.service) newErrors.service = "Please select a service.";
    if (formData.service && formData.subservices.length === 0) {
      newErrors.subservices = "Select at least one subservice.";
    }
    if (!formData.bio.trim()) newErrors.bio = "Bio is required.";
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.contact)) {
      newErrors.contact = "Enter a valid 10-digit phone number.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Ideally send updated formData to backend here
    console.log("Updated Provider Profile:", formData);

    // Navigate back to profile view
    navigate("/provider/ProviderProfileView");
  };

  return (
    <div className="create-profile-container">
      <h2>Edit Your Profile</h2>
      <form className="create-profile-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        {/* Main Service */}
        <div className="form-group">
          <label>Service Offered</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
          >
            <option value="">-- Select a Service --</option>
            {Object.keys(servicesWithSub).map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service && <span className="error">{errors.service}</span>}
        </div>

        {/* Subservices */}
        {formData.service && (
          <div className="form-group">
            <label>Subservices</label>
            <div className="subservices-container">
              {servicesWithSub[formData.service].map((sub) => (
                <label key={sub} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={sub}
                    checked={formData.subservices.includes(sub)}
                    onChange={handleSubserviceChange}
                  />
                  {sub}
                </label>
              ))}
            </div>
            {errors.subservices && (
              <span className="error">{errors.subservices}</span>
            )}
          </div>
        )}

        {/* Contact */}
        <div className="form-group">
          <label>Contact Number</label>
          <input
            name="contact"
            type="text"
            placeholder="Enter 10-digit phone number"
            value={formData.contact}
            onChange={handleChange}
          />
          {errors.contact && <span className="error">{errors.contact}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Bio */}
        <div className="form-group">
          <label>Bio / Description</label>
          <textarea
            name="bio"
            placeholder="Tell us about your skills, experience, and passion..."
            value={formData.bio}
            onChange={handleChange}
            rows={4}
          />
          {errors.bio && <span className="error">{errors.bio}</span>}
        </div>

        {/* Profile Pic */}
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

        <button type="submit">💾 Save Changes</button>
      </form>
    </div>
  );
}

export default EditProviderProfile;

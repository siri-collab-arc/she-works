import React, { useState } from "react";
import "./ClientProfileEditPage.css";

const ClientProfileEditPage = () => {
  const [formData, setFormData] = useState({
    name: "Demo Client",
    email: "demo@example.com",
    profilePic: "/assets/default-profile.png",
    phone: "9876543210",
    address: "Hyderabad, India",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic" && files.length > 0) {
      setFormData({ ...formData, profilePic: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully! 🚀");
    // Later: Send data to backend via API
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>

      <form className="edit-profile-form" onSubmit={handleSubmit}>
        {/* Profile Picture */}
        <div className="form-group profile-pic-group">
          <img
            src={formData.profilePic}
            alt="Profile Preview"
            className="profile-preview"
          />
          <input type="file" name="profilePic" accept="image/*" onChange={handleChange} />
        </div>

        {/* Name */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="save-btn">
            💾 Save Changes
          </button>
          <button type="button" className="cancel-btn" onClick={() => window.history.back()}>
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientProfileEditPage;

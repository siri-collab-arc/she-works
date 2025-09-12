/*import React, { useState } from 'react';
import './EditProviderProfile.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const initialData = {
  name: 'Anjali Sharma',
  service: 'Embroidery',
  bio: 'Passionate about traditional embroidery with 5+ years of experience.',
  contact: 'anjali@example.com',
  images: ['/images/work-0.jpg', '/images/work-1.jpg']
};

const EditProviderProfile = () => {
  const [profile, setProfile] = useState(initialData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setProfile((prev) => ({ ...prev, images: imageURLs }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/provider/profile');
  };

  return (
    <motion.div className="edit-profile-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2>Edit Your Profile</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label>Name
          <input type="text" name="name" value={profile.name} onChange={handleChange} required />
        </label>

        <label>Service
          <input type="text" name="service" value={profile.service} onChange={handleChange} required />
        </label>

        <label>Bio
          <textarea name="bio" value={profile.bio} onChange={handleChange} rows="4" required />
        </label>

        <label>Contact Email
          <input type="email" name="contact" value={profile.contact} onChange={handleChange} required />
        </label>

        <label>Upload Portfolio Images
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
        </label>

        <div className="preview-images">
          {profile.images.map((src, index) => (
            <img key={index} src={src} alt={`preview-${index}`} />
          ))}
        </div>

        <motion.button type="submit" className="save-button" whileTap={{ scale: 0.95 }}>Save Changes</motion.button>
      </form>
    </motion.div>
  );
};

export default EditProviderProfile;*/


import React, { useState } from 'react';
import './EditProviderProfile.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialData = {
  name: 'Anjali Sharma',
  service: 'Embroidery',
  bio: 'Passionate about traditional embroidery with 5+ years of experience.',
  contact: 'anjali@example.com',
  images: ['/images/work-0.jpg', '/images/work-1.jpg']
};

const EditProviderProfile = () => {
  const [profile, setProfile] = useState(initialData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setProfile((prev) => ({ ...prev, images: imageURLs }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully!', {
      position: 'top-center',
      autoClose: 2000
    });
    setTimeout(() => navigate('/provider/ProviderProfileView'), 2000);
  };

  return (
    <motion.div 
      className="edit-profile-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        initial={{ scale: 0.9 }} 
        animate={{ scale: 1 }} 
        transition={{ delay: 0.1 }}
      >
        Edit Your Profile
      </motion.h2>

      <motion.form 
        className="edit-form" 
        onSubmit={handleSubmit} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.2 }}
      >
        <motion.label whileHover={{ scale: 1.03 }}>Name
          <input type="text" name="name" value={profile.name} onChange={handleChange} required />
        </motion.label>

        <motion.label whileHover={{ scale: 1.03 }}>Service
          <input type="text" name="service" value={profile.service} onChange={handleChange} required />
        </motion.label>

        <motion.label whileHover={{ scale: 1.03 }}>Bio
          <textarea name="bio" value={profile.bio} onChange={handleChange} rows="4" required />
        </motion.label>

        <motion.label whileHover={{ scale: 1.03 }}>Contact Email
          <input type="email" name="contact" value={profile.contact} onChange={handleChange} required />
        </motion.label>

        <motion.label whileHover={{ scale: 1.03 }}>Upload Portfolio Images
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
        </motion.label>

        <div className="preview-images">
          {profile.images.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt={`preview-${index}`}
              className="preview-image"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>

        <motion.button 
          type="submit" 
          className="save-button" 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          Save Changes
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default EditProviderProfile;

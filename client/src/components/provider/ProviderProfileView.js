// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";
// import "./ProviderProfileView.css";

// const BASE_URL = "http://localhost:5000";

// const ProviderProfileView = () => {
//   const navigate = useNavigate();
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userProfileImage, setUserProfileImage] = useState("");

//   // Helper to build full image URL
//   const getFullImageURL = (path) => {
//     if (!path) return "";
//     return path.startsWith("http") ? path : `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const user = JSON.parse(localStorage.getItem("user") || "{}");
//       if (!user?.id) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch provider's services
//         const res = await axios.get(`${BASE_URL}/api/services/provider/${user.id}`);
//         setServices(res.data || []);

//         // Fetch user profile image
//         const userRes = await axios.get(`${BASE_URL}/api/auth/user/${user.id}`);
//         const profileImg = userRes.data?.profileImage || res.data?.[0]?.images?.[0] || "";
//         setUserProfileImage(profileImg);
//       } catch (err) {
//         console.error("Fetch profile error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   if (loading) return <p>Loading...</p>;

//   if (!services.length) {
//     return (
//       <div>
//         <p>No profile/services found. Please create your profile.</p>
//         <button onClick={() => navigate("/provider/CreateProfile")}>Create Profile</button>
//       </div>
//     );
//   }

//   const profile = services[0];

//   return (
//     <div className="provider-profile-view">
//       {/* Header */}
//       <div className="profile-header">
//         <div className="profile-header-left">
//           <img
//             src={userProfileImage ? getFullImageURL(userProfileImage) : "/assets/default-profile.png"} 
//             alt={profile.providerName}
//             className="profile-pic-circle"
//           />
//         </div>

//         <div className="profile-header-right">
//           <h2>{profile.providerName}</h2>
//           <p>{profile.title} — {profile.subservices?.join(", ")}</p>
//           <div className="profile-actions">
//             <button className="action-btn" onClick={() => navigate(`/edit-profile/${profile._id}`)}>✏️ Edit Profile</button>
//             <button className="action-btn" onClick={() => navigate("/provider/ManageBookings")}>📅 Manage Bookings</button>
//           </div>
//         </div>
//       </div>

//       {/* About */}
//       <div className="profile-section">
//         <h3>About</h3>
//         <p>{profile.description}</p>
//         <p><strong>Contact:</strong> {profile.providerContact}</p>
//         <p><strong>Email:</strong> {profile.providerEmail}</p>
//         <p><strong>Location:</strong> {profile.location}</p>
//         <p><strong>Price:</strong> {profile.price}</p>
//       </div>

//       {/* Portfolio */}
//       <div className="profile-section">
//         <h3>Portfolio</h3>
//         <div className="image-gallery">
//           {profile.images?.length > 0 ? (
//             profile.images.map((img, i) => (
//               <motion.img
//                 key={i}
//                 src={getFullImageURL(img)}
//                 alt={`work-${i}`}
//                 className="gallery-image"
//                 whileHover={{ scale: 1.08 }}
//               />
//             ))
//           ) : (
//             <p>No portfolio uploaded yet.</p>
//           )}
//         </div>

//         {/* Upload Work */}
//         <div style={{ marginTop: 12 }}>
//           <label className="upload-button">
//             Upload Work
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={async (e) => {
//                 const files = Array.from(e.target.files);
//                 if (!files.length) return;

//                 const fd = new FormData();
//                 files.forEach((f) => fd.append("images", f));
//                 const token = localStorage.getItem("token");

//                 try {
//                   // Upload images
//                   await axios.put(`${BASE_URL}/api/services/${profile._id}`, fd, {
//                     headers: {
//                       Authorization: `Bearer ${token}`,
//                       "Content-Type": "multipart/form-data",
//                     },
//                   });

//                   // Refresh services and profile image
//                   const r = await axios.get(`${BASE_URL}/api/services/provider/${JSON.parse(localStorage.getItem("user")).id}`);
//                   setServices(r.data);
//                   if (r.data?.[0]?.images?.[0]) setUserProfileImage(r.data[0].images[0]);
//                 } catch (err) {
//                   console.error("Upload error:", err);
//                   alert("Upload failed");
//                 }
//               }}
//             />
//           </label>
//         </div>
//       </div>

//       {/* Bookings */}
//       <div className="profile-section">
//         <h3>Client Bookings</h3>
//         <p>Bookings functionality will be shown here later.</p>
//       </div>

//       {/* Reviews */}
//       <div className="profile-section">
//         <h3>Client Reviews & Ratings</h3>
//         <p>Reviews will be displayed here later.</p>
//       </div>

//       {/* Logout */}
//       <div className="logout-btn-container">
//         <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
//       </div>
//     </div>
//   );
// };

// export default ProviderProfileView;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "./ProviderProfileView.css";

const BASE_URL = "http://localhost:5000";

const ProviderProfileView = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to build image URLs
  const getFullImageURL = (path) => {
    if (!path || path === "") {
      return "https://via.placeholder.com/150x150.png?text=Upload+Photo";
    }
    if (path.startsWith("http")) {
      return path;
    }
    // Add timestamp to prevent caching
    return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}?t=${new Date().getTime()}`;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          navigate("/login");
          return;
        }

        // Fetch user (with profile image)
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/api/auth/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res)
        setProfile(res.data);
      } catch (err) {
        console.error("Fetch profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <motion.div
      className="provider-profile-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="profile-header">
        <div className="profile-image-container">
          <img
            src={getFullImageURL(profile.profileImage)}
            alt={profile.name}
            className="profile-pic-circle"
          />
          <label className="profile-image-upload">
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                // Validate file size
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                  alert('Image size should be less than 5MB');
                  return;
                }

                // Validate file type
                const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                if (!validTypes.includes(file.type)) {
                  alert('Please select a valid image file (JPEG, PNG, GIF, or WEBP)');
                  return;
                }

                const formData = new FormData();
                formData.append('profileImage', file);

                try {
                  const token = localStorage.getItem('token');
                  if (!token) {
                    alert('Please login again');
                    navigate('/login');
                    return;
                  }

                  const response = await axios.post(
                    `${BASE_URL}/api/auth/profile-image`,
                    formData,
                    {
                      headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                      }
                    }
                  );

                  if (response.data && response.data.profileImage) {
                    // Update the profile state with new image and user data
                    setProfile(prev => ({
                      ...prev,
                      ...response.data.user
                    }));
                    
                    // Update the local storage user data
                    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
                    localStorage.setItem('user', JSON.stringify({
                      ...currentUser,
                      profileImage: response.data.profileImage
                    }));
                    
                    // Show success message
                    alert('Profile image updated successfully');
                  } else {
                    throw new Error('Invalid server response');
                  }
                } catch (err) {
                  console.error('Profile image upload error:', err);
                  alert(err.response?.data?.message || 'Failed to upload profile image. Please try again.');
                }
              }}
            />
            📷 Update Photo
          </label>
        </div>
        <h2>{profile.name}</h2>
        <p>{profile.email}</p>
        <p>{profile.contact}</p>
      </div>

      <div className="profile-details">
        <h3>Service: {profile.service}</h3>
        <p>
          <strong>Subservices:</strong> {profile.subservices?.join(", ")}
        </p>
        <p>
          <strong>Description:</strong> {profile.description}
        </p>
        <p>
          <strong>Price:</strong> ₹{profile.price}
        </p>
        <p>
          <strong>Location:</strong> {profile.location}
        </p>
      </div>

      {profile.images && profile.images.length > 0 && (
        <div className="portfolio-section">
          <h3>Portfolio</h3>
          <div className="gallery">
            {profile.images.map((img, i) => (
              <motion.img
                key={i}
                src={getFullImageURL(img)}
                alt={`work-${i}`}
                className="gallery-image"
                whileHover={{ scale: 1.08 }}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProviderProfileView;

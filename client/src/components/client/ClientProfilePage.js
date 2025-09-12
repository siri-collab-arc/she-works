// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./ClientProfilePage.css";

// const ClientProfilePage = () => {
//   // Dummy data for demo (replace with API/backend data later)
//   const [user] = useState({
//     name: "Demo Client",
//     email: "demo@example.com",
//     profileImage: "/assets/default-profile.png",
//   });

//   const [orders] = useState([
//     { id: 1, service: "Bridal Embroidery", status: "In Progress" },
//     { id: 2, service: "South Indian Meals", status: "Delivered" },
//     { id: 3, service: "Birthday Decoration", status: "Pending" },
//   ]);

//   const [favorites] = useState([
//     { id: "hand", name: "Hand Embroidery" },
//     { id: "snacks", name: "Snacks & Tiffins" },
//   ]);

//   const [chats] = useState([
//     { id: "anita123", name: "Anita Sharma (Embroidery)" },
//     { id: "deepak001", name: "Deepak Kumar (Catering)" },
//   ]);

//   return (
//     <div className="client-profile-container">
//       {/* Profile Section */}
//       <div className="profile-header">
//         <img
//           src={user.profileImage}
//           alt="Profile"
//           className="profile-large"
//         />
//         <div className="profile-info">
//           <h2>{user.name}</h2>
//           <p>{user.email}</p>
//           <Link to="/client/edit-profile">
//             <button className="edit-btn">Edit Profile</button>
//           </Link>
//         </div>
//       </div>

//       {/* Orders Section */}
//       <div className="profile-section">
//         <h3>My Orders</h3>
//         <ul>
//           {orders.map((order) => (
//             <li key={order.id}>
//               {order.service} - <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Favorites Section */}
//       <div className="profile-section">
//         <h3>Favorites</h3>
//         {favorites.length > 0 ? (
//           <ul>
//             {favorites.map((fav) => (
//               <li key={fav.id}>{fav.name}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No favorites yet.</p>
//         )}
//       </div>

//       {/* Chats Section */}
//       <div className="profile-section">
//         <h3>Chats</h3>
//         {chats.length > 0 ? (
//           <ul>
//             {chats.map((chat) => (
//               <li key={chat.id}>
//                 <Link to={`/client/chat/${chat.id}`} className="chat-link">
//                   💬 {chat.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No conversations yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClientProfilePage;
import React, { useState } from "react";
import "./ClientProfilePage.css";

const ClientProfilePage = () => {
  const [user, setUser] = useState({
    name: "Demo Client",
    email: "demo@example.com",
    profileImage: "/assets/default-profile.png",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
    }
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="client-profile-container">
      <h2>My Profile</h2>

      <div className="profile-details">
        <img
          src={isEditing ? formData.profileImage : user.profileImage}
          alt="Profile"
          className="profile-large"
        />

        {isEditing ? (
          <div className="edit-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Profile Picture:
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>

            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div className="profile-info">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Orders:</strong> 3 Active
            </p>

            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientProfilePage;

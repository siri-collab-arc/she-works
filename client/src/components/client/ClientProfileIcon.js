import React from "react";
import { Link } from "react-router-dom";
import "./ClientProfileIcon.css";

function ClientProfileIcon({ user }) {
  // Example: user = { name: "Sathya S", profileImage: "/uploads/sathya.jpg" }

  const initials = user?.name
    ? user.name
        .split(" ") // split by space
        .map((n) => n[0]) // take first letter
        .join("") // join them
        .toUpperCase()
    : "S"; // default "U" if no name

  return (
    <div className="profile-icon-wrapper">
      <Link to="/client/profile">
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="profile-circle"
          />
        ) : (
          <div className="profile-circle initials-circle">{initials}</div>
        )}
      </Link>
    </div>
  );
}

export default ClientProfileIcon;

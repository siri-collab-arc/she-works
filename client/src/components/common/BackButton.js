// src/components/common/BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        position: "fixed",
        top: "15px",
        left: "15px",
        background: "#d6ba5dff",
        border: "1px solid #ccc",
        borderRadius: "50%",
        width: "35px",
        height: "35px",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      ←
    </button>
  );
};

export default BackButton;

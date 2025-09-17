// src/components/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import './Auth.css'; 
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });

  const navigate = useNavigate();

  // Clear form when component mounts
  useEffect(() => {
    setFormData({ email: '', password: '', role: '' });
  }, []);

  const handleChange = (e) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.role) {
      alert("Please select a role!");
      return;
    }

    alert(`Logged in as ${formData.role}`);
    navigate(formData.role === 'client' ? '/client/dashboard' : '/provider/CreateProfile');
  };

  return (
    <div className="auth-container">
      <div className="interactive-grid"></div>

      <form 
        className="auth-card" 
        onSubmit={handleSubmit} 
        autoComplete="off"
      >
        <h2>Welcome</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="" disabled hidden>
            Select Role
          </option>
          <option value="client">Client</option>
          <option value="provider">Service Provider</option>
        </select>
          
        <button type="submit" className="login-btn">Login</button>

        <div>
          <p>
            New user? 
            <Link to="/register" style={{ margin: '0 10px' }}>Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

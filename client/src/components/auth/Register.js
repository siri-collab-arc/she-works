// src/components/auth/Register.jsx
/*import React, { useState, useEffect } from 'react';
import './Auth.css'; // Reusing the same CSS
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client',
  });

  const navigate = useNavigate();

  // Clear form when component mounts
  useEffect(() => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'client',
    });
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registered as ${formData.role}`);
    navigate('/login'); // 👈 after registration go to login
  };

  return (
    <div className="auth-container">
      <div className="interactive-grid"></div>

      <form className="auth-card" onSubmit={handleSubmit} autoComplete="off">
        <h2>Create Your Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
          autoComplete="off"
        />

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
          onChange={handleChange}
          value={formData.role}
        >
          <option value="client">Client</option>
          <option value="provider">Service Provider</option>
        </select>

        <button type="submit" className="login-btn">Register</button>

        <p>
          Already have an account? 
          <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;*/

// src/components/auth/Register.jsx
import React, { useState, useEffect } from 'react';
import './Auth.css'; 
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate();

  // Reset form fields on mount
  useEffect(() => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: '',
    });
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registered as ${formData.role}`);
    navigate('/login'); // 👈 after register, go to login
  };

  return (
    <div className="auth-container">
      <div className="interactive-grid"></div>

      <form 
        className="auth-card" 
        onSubmit={handleSubmit} 
        autoComplete="off"   // 👈 disable autofill
      >
        <h2>Create Your Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
          autoComplete="off"
        />

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

        <button type="submit" className="login-btn">Register</button>

        <p>
          Already have an account? 
          <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;



// src/components/shared/Navbar.jsx*import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
      <Link to="/" style={{ margin: '0 10px' }}>Login</Link>
      <Link to="/register" style={{ margin: '0 10px' }}>Register</Link>
      
      
      
    </nav>
  );
};

export default Navbar;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // Redirect based on user role
      if (user.role === 'provider') {
        navigate('/provider/dashboard');
      } else if (user.role === 'client') {
        navigate('/client/dashboard');
      }
    }
  }, [navigate]);

  // If not authenticated, render the login component
  return children;
};

export default AuthRedirect;
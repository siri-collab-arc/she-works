// src/components/client/ServiceList.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ServiceList.css';
import ClientProfileIcon from './ClientProfileIcon';

const BASE_URL = 'http://localhost:5000/api';

const ServiceList = () => {
  const { category, subService } = useParams();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/services/category/${category}/subservice/${subService}`);
        setProviders(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching providers:', err);
        setError('Failed to load service providers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (category && subService) {
      fetchProviders();
    }
  }, [category, subService]);

  if (!category || !subService) {
    return <p>Invalid route. Please go back and select a category & sub-service.</p>;
  }

  if (loading) {
    return <div className="service-list"><p>Loading service providers...</p></div>;
  }

  if (error) {
    return <div className="service-list"><p className="error">{error}</p></div>;
  }

  return (
    <div className="service-list">
      <h2>
        Providers for "{subService}" in {category}
      </h2>
      <div>
        <ClientProfileIcon />  
      </div>
      <div className="grid">
        {providers.length > 0 ? (
          providers.map((service) => (
            <div key={service._id} className="card">
              <img 
                src={`/assets/ServiceProviderImages/${service.title.toLowerCase().replace(/\s+/g, '')}.jpeg`}
                alt={service.provider?.name || 'Service Provider'} 
                onError={(e) => {
                  e.target.src = '/assets/default-service.jpg';
                }}
              />
              <h3>{service.provider?.name || 'Service Provider'}</h3>
              <p className="service-details">
                <span className="service-type">{service.subservices.join(', ')}</span>
              </p>
              {service.description && <p>{service.description}</p>}
              {service.price && <p>💲 Starting from ₹{service.price}</p>}
              {service.location && <p>📍 {service.location}</p>}
              <Link to={`/provider/${service.provider?._id}`}>
                <button>View Profile</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No service providers found for {subService} in {category}. Check back later!</p>
        )}
      </div>
    </div>
  );
};

export default ServiceList;
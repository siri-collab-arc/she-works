// src/components/client/ServiceList.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ServiceList.css';
import ClientProfileIcon from './ClientProfileIcon';

const dummyProviders = [
  {
    id: 'anita123',
    name: 'Anita Sharma',
    category: 'embroidery',
    subService: 'hand',
    rating: 4.8,
    reviews: 27,
    description: 'Expert in traditional hand embroidery.',
    image: '/assets/ServiceProviderImages/Embriodery1.jpeg',
  },
  {
    id: 'priya456',
    name: 'Priya Verma',
    category: 'embroidery',
    subService: 'machine',
    rating: 4.6,
    reviews: 19,
    description: 'Modern designs with a personal touch.',
    image: '/assets/ServiceProviderImages/Embriodery2.jpg',
  },
  {
    id: 'sushma123',
    name: 'Sushma',
    category: 'embroidery',
    subService: 'bridal',
    rating: 4.9,
    reviews: 31,
    description: 'Specialist in bridal embroidery.',
    image: '/assets/ServiceProviderImages/Embriodery3.jpeg',
  },
  {
    id: 'deepak001',
    name: 'Deepak Kumar',
    category: 'home-cooked-food',
    subService: 'south-indian',
    rating: 4.7,
    reviews: 22,
    description: 'Authentic South Indian catering.',
    image: '/assets/ServiceProviderImages/Catering1.jpeg',
  },
  {
    id: 'neha789',
    name: 'Neha',
    category: 'home-cooked-food',
    subService: 'north-indian',
    rating: 4.5,
    reviews: 15,
    description: 'Delicious homemade bakery items.',
    image: '/assets/ServiceProviderImages/Catering2.jpeg',
  },
];

function ServiceList() {
  const { category, subService } = useParams();

  // ✅ Prevent crash if params are missing
  if (!category || !subService) {
    return <p>Invalid route. Please go back and select a category & sub-service.</p>;
  }

  const providers = dummyProviders.filter(
    (p) =>
      p.category?.toLowerCase() === category.toLowerCase() &&
      p.subService?.toLowerCase() === subService.toLowerCase()
  );

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
          providers.map((provider) => (
            <div key={provider.id} className="card">
              <img src={provider.image} alt={provider.name} />
              <h3>{provider.name}</h3>
              <p>{provider.description}</p>
              <p>⭐ {provider.rating} ({provider.reviews} reviews)</p>
              <Link to={`/provider/${provider.id}`}>
                <button>View Profile</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No providers found for this sub-service.</p>
        )}
      </div>
    </div>
  );
}

export default ServiceList;

// src/components/client/PaymentPage.jsx
import React from 'react';
import './PaymentPage.css';
import { useParams } from 'react-router-dom';

function PaymentPage() {
  const { providerId } = useParams();

  const dummyServiceDetails = {
    service: 'Custom Embroidery',
    price: 999,
    provider: providerId || 'anita123',
  };

  const handlePayment = () => {
    alert('💳 Payment successful (mock)');
  };

  return (
    <div className="payment-container">
      <h2>Payment for {dummyServiceDetails.service}</h2>
      <div className="payment-box">
        <p><strong>Provider ID:</strong> {dummyServiceDetails.provider}</p>
        <p><strong>Service:</strong> {dummyServiceDetails.service}</p>
        <p><strong>Amount:</strong> ₹{dummyServiceDetails.price}</p>

        <div className="card-details">
          <input type="text" placeholder="Cardholder Name" />
          <input type="text" placeholder="Card Number" />
          <input type="text" placeholder="Expiry Date (MM/YY)" />
          <input type="text" placeholder="CVV" />
        </div>

        <button onClick={handlePayment}>💳 Pay Now</button>
      </div>
    </div>
  );
}

export default PaymentPage;

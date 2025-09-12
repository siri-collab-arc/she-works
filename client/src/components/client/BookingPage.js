// src/pages/client/BookingPage.jsx
/*import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './BookingPage.css';

function BookingPage() {
  const { providerId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Booking Submitted Successfully!');
    // Send formData to backend here
  };

  return (
    <div className="booking-page">
      <div className="booking-card">
        <h2>📅 Book a Service with Provider: {providerId}</h2>
        <form className="booking-form" onSubmit={handleSubmit}>
        <div className="floating-label">
           <input name="name" type="text" placeholder=" " value={formData.name} onChange={handleChange} required />
           <label>Name</label>
        </div>

        <div className="floating-label">
           <input name="email" type="email" placeholder=" " value={formData.email} onChange={handleChange} required />
           <label>Email</label>
        </div>

       <div className="floating-label">
          <input name="date" type="date" placeholder=" " value={formData.date} onChange={handleChange} required />
          <label>Preferred Date</label>
       </div>

        <div className="floating-label">
           <select name="service" value={formData.service} onChange={handleChange} required>
             <option value="">Select a service</option>
             <option value="Embroidery">Embroidery</option>
             <option value="Home Food">Home-Cooked Food</option>
             <option value="Gift Packing">Gift Packing</option>
            </select>
            <label>Service Required</label>
        </div>

        <div className="floating-label full-width">
          <textarea name="message" placeholder=" " value={formData.message} onChange={handleChange} />
          <label>Message (Optional)</label>
        </div>

        <div className="booking-buttons full-width">
         <button type="submit">📅 Confirm Booking</button>
        </div>
     </form>


        <div className="payment-info">
          <h3>💰 Payment Info</h3>
          <p>
            UPI ID: <strong>anita@upi</strong><br />
            Bank: XYZ Bank<br />
            Account Holder: Anita Sharma
          </p>
          <img src="/images/payment_qr.png" alt="UPI QR Code" />
        </div>
      </div>
    </div>
  );
}

export default BookingPage;*/




// src/pages/client/BookingPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './BookingPage.css';
import ClientProfileIcon from './ClientProfileIcon';

function BookingPage() {
  const { providerId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Booking Submitted Successfully!');
    // Send formData to backend here
  };

  return (
    <div className="booking-page">
      <div>
      <ClientProfileIcon />
      </div>
      <div className="booking-card">
        <h2>📅 Book a Service with Provider: {providerId}</h2>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="floating-label">
            <input
              name="name"
              type="text"
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label>Name</label>
          </div>

          <div className="floating-label">
            <input
              name="email"
              type="email"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>

          <div className="floating-label">
            <input
              name="date"
              type="date"
              placeholder=" "
              value={formData.date}
              onChange={handleChange}
              required
            />
            <label>Preferred Date</label>
          </div>

          <div className="floating-label">
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>Select a Service</option>
              <option value=" Hand Embroidery">Hand Embroidery</option>
              <option value="Machine Embroidery">Machine Embroidery</option>
              <option value="Free Style Embroidery">Free Style Embriodery</option>
              <option value="Beads Embroidery">Beads Embriodery</option>
            </select>
            <label>Service Required</label>
          </div>

          <div className="floating-label full-width">
            <textarea
              name="message"
              placeholder=" "
              value={formData.message}
              onChange={handleChange}
            />
            <label>Message (Optional)</label>
          </div>

          <div className="booking-buttons full-width">
            <button type="submit">📅 Confirm Booking</button>
          </div>
        </form>

        <div className="payment-info">
          <h3>💰 Payment Info</h3>
          <p>
            UPI ID: <strong>anita@upi</strong>
            <br />
            Bank: XYZ Bank
            <br />
            Account Holder: Anita Sharma
          </p>
          <img src="/images/payment_qr.png" alt="UPI QR Code" />
        </div>
      </div>
    </div>
  );
}

export default BookingPage;


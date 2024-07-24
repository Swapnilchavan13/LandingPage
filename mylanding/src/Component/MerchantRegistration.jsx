import React, { useState } from 'react';

export const MerchantRegistration = () => {
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState('');
  const [loginPin, setLoginPin] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginPin.length !== 4 || isNaN(loginPin)) {
      alert('Login PIN must be a 4-digit number.');
      return;
    }

    const merchantDetails = {
      businessName,
      businessAddress,
      contactPerson,
      contactEmail,
      contactPhoneNumber,
      loginPin,
    };

    try {
      const response = await fetch('https://localitebackend.localite.services/merchants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(merchantDetails),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Merchant registered:', result);

        // Clear the form
        setBusinessName('');
        setBusinessAddress('');
        setContactPerson('');
        setContactEmail('');
        setContactPhoneNumber('');
        setLoginPin('');
      } else {
        console.error('Failed to register merchant');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <style>{`
        .merchant-form {
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
          margin: auto;
        }

        .merchant-form h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .submit-button {
          background-color: #28a745;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 20px;
          width: 100%;
        }

        .submit-button:hover {
          background-color: #218838;
        }
      `}</style>
      <form onSubmit={handleSubmit} className="merchant-form">
        <h2>Merchant Registration</h2>

        <div className="form-group">
          <label>Business Name:</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Business Address:</label>
          <input
            type="text"
            value={businessAddress}
            onChange={(e) => setBusinessAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Person:</label>
          <input
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Email:</label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Phone Number:</label>
          <input
            type="tel"
            value={contactPhoneNumber}
            onChange={(e) => setContactPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Create Login PIN (4 digits):</label>
          <input
            type="password"
            value={loginPin}
            onChange={(e) => setLoginPin(e.target.value)}
            required
            maxLength="4"
          />
        </div>

        <button type="submit" className="submit-button">Register</button>
      </form>
    </>
  );
};

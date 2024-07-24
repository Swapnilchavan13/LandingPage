import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [merchants, setMerchants] = useState([]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await fetch('https://localitebackend.localite.services/allmerchants');
        const data = await response.json();
        setMerchants(data);
      } catch (error) {
        console.error('Error fetching merchants:', error);
      }
    };

    fetchMerchants();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = merchants.find(
      (merchant) => merchant.contactPhoneNumber === mobileNumber && merchant.loginPin === loginPin
    );

    if (user) {
      login(user.contactPhoneNumber); // Call login from AuthContext with user's phone number
      navigate('/research'); // Use navigate for redirection
    } else {
      setError('Invalid mobile number or PIN');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPin">Login PIN:</label>
          <input
            type="password"
            id="loginPin"
            value={loginPin}
            onChange={(e) => setLoginPin(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

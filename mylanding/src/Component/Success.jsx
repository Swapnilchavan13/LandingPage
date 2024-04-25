import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/success.css'; // Import the CSS file

export const Success = () => {
  const navigate = useNavigate();

  // Redirect to home page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/wallet');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container">
      <img src="https://i.pinimg.com/originals/73/3a/e1/733ae1f2c79b516377e013e6398d9dfb.gif" alt="Success" className="image" />
      <h1 className="message">Thanks for completing the activity!</h1>
    </div>
  );
};



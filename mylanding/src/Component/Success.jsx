import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/success.css'; // Import the CSS file

export const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extracting userId from the query parameters
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userid');

    // Redirect to wallet page after 5 seconds with userId query parameter
    const timer = setTimeout(() => {
      navigate(`/wallet?userid=${userId}`);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, location.search]);

  return (
    <div className="container">
      <img src="https://i.pinimg.com/originals/73/3a/e1/733ae1f2c79b516377e013e6398d9dfb.gif" alt="Success" className="image" />
      <h1 className="message">Thanks for completing the activity!</h1>
    </div>
  );
};

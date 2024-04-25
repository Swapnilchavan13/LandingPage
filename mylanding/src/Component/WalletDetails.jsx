import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/wallet.css'; // Import your CSS file

export const WalletDetails = () => {
  const [userWallet, setUserWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserWallet = async () => {
      try {
        const response = await fetch('http://97.74.94.109:8086/getwallet');
        if (!response.ok) {
          throw new Error('Failed to fetch wallet details');
        }
        const data = await response.json();
        // Assuming the first user's ID is 1
        const userWalletData = data.walletDetails.find(wallet => wallet.userID === 1);
        setUserWallet(userWalletData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserWallet();
  }, []);

  if (loading) {
    return <div className="container loading">Loading...</div>;
  }

  if (error) {
    return <div className="container error">Error: {error}</div>;
  }

  if (!userWallet) {
    return <div className="container">No wallet details found for the first user.</div>;
  }

  return (
    <div className="container">
      <div className="user-info">
        <h2>Wallet Details for User {userWallet.userID}</h2>
        <h2>Points: {userWallet.value}</h2>
      </div>
      <div className="activity-links">
        <h3>Points Earning Activity Links</h3>
        <button>
        <Link to="/ians">Image Activity</Link>
        </button>
        <br />
        <button>
        <Link to="/vans">Video Activity</Link>
        </button>
        <br />
        <button>
        <Link to="/survey">Survey Activity</Link>
        </button>
      </div>
    </div>
  );
};

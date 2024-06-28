import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/wallet.css'; // Import your CSS file

export const WalletDetails = () => {
  const [userWallet, setUserWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null); // Add state for userName

  useEffect(() => {
    // Extract the userid from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userid = urlParams.get('userid');
    console.log("userid:" + userid);
    setUserId(userid);
  }, []);

  console.log('UserID:', userId); // Log the extracted user ID

  useEffect(() => {
    const fetchUserWallet = async () => {
      try {
        const response = await fetch(`http://97.74.94.109:4020/getwallet`);
        if (!response.ok) {
          throw new Error('Failed to fetch wallet details');
        }
        const data = await response.json();
        // console.log('Fetched Data:', data); // Log the fetched data for debugging
        const userWalletData = data.walletDetails.find(wallet => wallet.userID == userId);
        // console.log('User Wallet Data:', userWalletData); // Log the user wallet data for debugging
        setUserWallet(userWalletData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchUserName = async () => {
      try {
        const response = await fetch(`http://97.74.94.109:4020/getlogindata/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user name');
        }
        const data = await response.json();
        setUserName(data.user.userName); // Update userName state
      } catch (error) {
        setError(error.message);
      }
    };

    if (userId) {
      fetchUserWallet();
      fetchUserName(); // Fetch userName as well
    }
  }, [userId]);

  if (loading) {
    return <div className="container loading">Loading...</div>;
  }

  if (error) {
    return <div className="container error">Error: {error}</div>;
  }

  if (!userWallet) {
    return <div className="container">No wallet details found for the user.</div>;
  }

  return (
    <div className="container">
      <div className="user-info">
        <h2>Wallet Details for User {userName}</h2> {/* Display userName */}
        <h2>Points: {userWallet.value}</h2>
      </div>
      <div className="activity-links">
        <button>
          <Link to={`/cashbackfro?userid=${userId}`}>Back TO Activity List</Link>
        </button>
      </div>
    </div>
  );
};

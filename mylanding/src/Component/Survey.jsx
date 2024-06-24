import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/survey.css";

export const Survey = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState({
    age: '',
    gender: '',
    skinType: '',
    favoriteProduct: '',
    preferredMakeupBrand: '',
    reasonForPurchase: ''
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Extract the userid from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userid = urlParams.get('userid');
    setUserId(userid);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming you have validation logic here
    try {
      // Make API call to submit survey responses (not implemented here)
      // On successful submission, update the wallet
      const walletResponse = await fetch(`http://97.74.94.109:4020/updateWallet/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ points: 100 }) // Adding 100 points for completing the survey
      });
      if (!walletResponse.ok) {
        throw new Error('Failed to update wallet');
      }

      // Make API call to add transaction details
      const transactionResponse = await fetch(`http://97.74.94.109:4020/newTransaction/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ points: 100, activityID: 1 }) // Assuming activityID for survey completion is 4
      });
      if (!transactionResponse.ok) {
        throw new Error('Failed to add transaction details');
      }

      alert('Survey submitted successfully! You have earned 100 points.');
      navigate(`/success?userid=${userId}`); // Navigate to success page
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit survey. Please try again later.');
    }
  };

  return (
    <div id="survey-container">
      <div className='sdiv'>
        <h1 id="survey-title">COSMETIC SURVEY</h1>
      </div>
      <form id="survey-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="age">What is your age?</label>
          <input type="number" id="age" name="age" value={responses.age} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="gender">What is your gender?</label>
          <select id="gender" name="gender" value={responses.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="skinType">What is your skin type?</label>
          <select id="skinType" name="skinType" value={responses.skinType} onChange={handleChange}>
            <option value="">Select</option>
            <option value="oily">Oily</option>
            <option value="dry">Dry</option>
            <option value="combination">Combination</option>
            <option value="normal">Normal</option>
          </select>
        </div>
        <div>
          <label htmlFor="favoriteProduct">What is your favorite cosmetic product?</label>
          <input type="text" id="favoriteProduct" name="favoriteProduct" value={responses.favoriteProduct} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="preferredMakeupBrand">What is your preferred makeup brand?</label>
          <input type="text" id="preferredMakeupBrand" name="preferredMakeupBrand" value={responses.preferredMakeupBrand} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="reasonForPurchase">What is the main reason for your cosmetic purchases?</label>
          <textarea id="reasonForPurchase" name="reasonForPurchase" value={responses.reasonForPurchase} onChange={handleChange}></textarea>
        </div>
        <button id="submit-button" type="submit">Submit</button>
        <br />
        <button>
          <Link to={`/cashbackfro?userid=${userId}`}>Back TO Activity List</Link>
        </button>
      </form>
    </div>
  );
};

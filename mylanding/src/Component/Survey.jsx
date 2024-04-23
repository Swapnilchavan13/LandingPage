import React, { useState } from 'react';
import "../styles/survey.css";


export const Survey = () => {
  const [responses, setResponses] = useState({
    age: '',
    gender: '',
    skinType: '',
    favoriteProduct: '',
    preferredMakeupBrand: '',
    reasonForPurchase: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div id="survey-container">
      <h1 id="survey-title">Cosmetic Survey</h1>
      <form id="survey-form">
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
      </form>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import '../styles/clickerdetails.css';
import axios from 'axios';

export const CashbackForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    activityDetails: '',
    categoryDetails: '',
    cashbackAmount: 0,
    dateTime: new Date().toISOString(), // Default to current date and time
    activityType: 'Quiz', // Default activity type
    categoryType: 'Category 1', // Default category type
    brandName: '', // Default brand name
    cashBackImagesURL: "", // Default cash back image URL
    gameURL: '' // Default game URL
  });

  // State to hold brand names fetched from the API
  const [brands, setBrands] = useState([]);

  // Function to fetch brand names from the API
  useEffect(() => {
    const fetchBrandNames = async () => {
      try {
        // Make a GET request to fetch brand names
        const response = await axios.get('http://97.74.94.109:4121/getBrandDetails');
        // Extract brand names from the response
        const names = response.data.brandDetails.map((brand) => brand.brandName);
        // Set the fetched brand names to the state
        setBrands(names);
        console.log(names)
      } catch (error) {
        console.error('Error fetching brand names:', error);
      }
    };

    // Fetch brand names when the component mounts
    fetchBrandNames();
  }, []); // Empty dependency array to run the effect only once

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to submit form data
      const response = await axios.post('http://192.168.0.114:8012/addactivitydetails', formData);
      console.log('Form submitted successfully:', response.data);
      // Reset the form after submission
      setFormData({
        activityDetails: '',
        categoryDetails: '',
        cashbackAmount: 0,
        // dateTime: new Date().toISOString(),
        activityType: 'Quiz',
        categoryType: 'Category 1',
        brandName: '', // Reset brand name
        cashBackImagesURL: '', // Reset cash back image URL
        gameURL: '' // Reset game URL
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Cashback Activity Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter Activity Details:</label>
          <input
            type="text"
            name="activityDetails"
            value={formData.activityDetails}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Select Category Type:</label>
          <select
            name="categoryType"
            value={formData.categoryType}
            onChange={handleInputChange}
          >
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
            <option value="Category 3">Category 3</option>
          </select>
        </div>
        <div>
          <label>Enter Category Details:</label>
          <input
            type="text"
            name="categoryDetails"
            value={formData.categoryDetails}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Enter Cashback Amount:</label>
          <input
            type="number"
            name="cashbackAmount"
            value={formData.cashbackAmount}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Select Brand:</label>
          <select
            name="brandName"
            value={formData.brandName}
            onChange={handleInputChange}
          >
            <option value="">Select Brand</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Enter Cashback Image URL:</label>
          <input
            type="text"
            name="cashBackImagesURL"
            value={formData.cashBackImagesURL}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Enter Game URL:</label>
          <input
            type="text"
            name="gameURL"
            value={formData.gameURL}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import "../styles/research.css";
import axios from 'axios'; // Import axios for HTTP requests


export const Researchdataentry = () => {
    const [appSection, setAppSection] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [title, setTitle] = useState('');
    const [offerHeadline, setOfferHeadline] = useState('');
    const [description, setDescription] = useState('');
    const [excerptDescription, setExcerptDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [videoLink, setVideoLink] = useState('');
    const [photo2, setPhoto2] = useState(null);
    const [price, setPrice] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState('');
    const [productCategories, setProductCategories] = useState([]);
  
    useEffect(() => {
      // Fetch product categories dynamically (simulated with a static array for now)
      const categories = ['Electronics', 'Fashion', 'Home', 'Books', 'Toys'];
      setProductCategories(categories);
    }, []);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('appSection', appSection);
        formData.append('productCategory', productCategory);
        formData.append('brand', brand);
        formData.append('title', title);
        formData.append('offerHeadline', offerHeadline);
        formData.append('description', description);
        formData.append('excerptDescription', excerptDescription);
        formData.append('photo', photo);
        formData.append('videoLink', videoLink);
        formData.append('photo2', photo2);
        formData.append('price', price);
        formData.append('discountedPrice', discountedPrice);
    
        try {
          const res = await fetch('http://localhost:3080/submit', {
            method: 'POST',
            body: formData
          });
    
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await res.json();
          console.log(data);
          alert("Data Added")
        } catch (err) {
          console.error('Error submitting form', err);
        }
      };
  
    return (
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-heading">Data Form</h2>
        <div className="form-group">
          <label>App Section:</label>
          <select value={appSection} onChange={(e) => setAppSection(e.target.value)}>
            <option value="">Select...</option>
            <option value="marketplace">Marketplace</option>
            <option value="offers">Offers</option>
            <option value="free">Free</option>
          </select>
        </div>
  
        <div className="form-group">
          <label>Product Category:</label>
          <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
            <option value="">Select...</option>
            {productCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
  
        <div className="form-group">
          <label>Brand:</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>
  
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
  
        <div className="form-group">
          <label>Offer Headline:</label>
          <input type="text" value={offerHeadline} onChange={(e) => setOfferHeadline(e.target.value)} />
        </div>
  
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
  
        <div className="form-group">
          <label>Excerpt Description:</label>
          <textarea value={excerptDescription} onChange={(e) => setExcerptDescription(e.target.value)} />
        </div>
  
        <div className="form-group">
          <label>Upload Photo:</label>
          <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        </div>
  
        <div className="form-group">
          <label>Video Link:</label>
          <input type="text" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
        </div>
  
        <div className="form-group">
          <label>Upload 2nd Photo:</label>
          <input type="file" onChange={(e) => setPhoto2(e.target.files[0])} />
        </div>
  
        <div className="form-group">
          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
  
        <div className="form-group">
          <label>Discounted Price:</label>
          <input type="text" value={discountedPrice} onChange={(e) => setDiscountedPrice(e.target.value)} />
        </div>
  
        <button type="submit" className="submit-button">Submit</button>
      </form>
    );
  };
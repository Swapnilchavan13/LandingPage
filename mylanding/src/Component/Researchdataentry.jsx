import React, { useState, useEffect } from 'react';


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
      const categories = ['Automotive&Transport', 'Clothing','DryCleaningServices', 'EducationandLearning', 'Entertainment&Leisure','Food', 'Food&Beverages', 'Handbags', 'Healthcare&Wellness','Home&Maintenance','Jewellery','PersonalCare','ProfessionalServices', 'Skin Care' ];
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
          const res = await fetch('http://62.72.59.146:3080/submit', {
            method: 'POST',
            body: formData
          });
    
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await res.json();
          console.log(data);
          alert("Data Added")

                // Reset all input fields after successful submission
      setAppSection('');
      setProductCategory('');
      setBrand('');
      setTitle('');
      setOfferHeadline('');
      setDescription('');
      setExcerptDescription('');
      setPhoto(null);
      setVideoLink('');
      setPhoto2(null);
      setPrice('');
      setDiscountedPrice('');

    } catch (err) {
      console.error('Error submitting form', err);
    }
  };
  
    return (
<>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          /* height: 100vh; */
        }
        
        .form {
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 800px;
        }
        
        .form-group {
          margin-bottom: 15px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 700px;
          padding: 8px;
          height: 80px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        
        .form-group textarea {
          resize: vertical;
        }
        
        .submit-button {
          background-color: #28a745;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top:30px;
          width: 50%;
        }
          .fimg{
          margin-top:20px
          }
        
        .submit-button:hover {
          background-color: #218838;
        }
      `}</style>
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-heading">Researcher Data Form</h2>
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
          <input className='fimg' type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        </div>
  
        <div className="form-group">
          <label>Video Link:</label>
          <input type="text" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
        </div>
  
        <div className="form-group">
          <label>Upload 2nd Photo:</label>
          <input className='fimg' type="file" onChange={(e) => setPhoto2(e.target.files[0])} />
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
          </>
    );
  };
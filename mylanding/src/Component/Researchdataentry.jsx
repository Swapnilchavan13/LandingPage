import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export const Researchdataentry = () => {
  const { user } = useAuth();

  const [appSection, setAppSection] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [brandImage, setBrandImage] = useState(null);
  const [title, setTitle] = useState('');
  const [offerHeadline, setOfferHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [excerptDescription, setExcerptDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const [photo2, setPhoto2] = useState(null);
  const [additionalPhoto1, setAdditionalPhoto1] = useState(null);
  const [additionalPhoto2, setAdditionalPhoto2] = useState(null);
  const [price, setPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [productCategories, setProductCategories] = useState([]);

  // Preview states
  const [brandImagePreview, setBrandImagePreview] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [photo2Preview, setPhoto2Preview] = useState('');
  const [additionalPhoto1Preview, setAdditionalPhoto1Preview] = useState('');
  const [additionalPhoto2Preview, setAdditionalPhoto2Preview] = useState('');

  useEffect(() => {
    // Fetch product categories dynamically (simulated with a static array for now)
    const categories = ['Automotive&Transport', 'Clothing','DryCleaningServices', 'EducationandLearning', 'Entertainment&Leisure','Food', 'Food&Beverages', 'Handbags', 'Healthcare&Wellness','Home&Maintenance','Jewellery','PersonalCare','ProfessionalServices', 'Skin Care' ];
    setProductCategories(categories);
  }, []);

  useEffect(() => {
    if (brandImage) {
      setBrandImagePreview(URL.createObjectURL(brandImage));
    }
  }, [brandImage]);

  useEffect(() => {
    if (photo) {
      setPhotoPreview(URL.createObjectURL(photo));
    }
  }, [photo]);

  useEffect(() => {
    if (photo2) {
      setPhoto2Preview(URL.createObjectURL(photo2));
    }
  }, [photo2]);

  useEffect(() => {
    if (additionalPhoto1) {
      setAdditionalPhoto1Preview(URL.createObjectURL(additionalPhoto1));
    }
  }, [additionalPhoto1]);

  useEffect(() => {
    if (additionalPhoto2) {
      setAdditionalPhoto2Preview(URL.createObjectURL(additionalPhoto2));
    }
  }, [additionalPhoto2]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('appSection', appSection);
    formData.append('productCategory', productCategory);
    formData.append('brand', brand);
    formData.append('brandImage', brandImage);
    formData.append('title', title);
    formData.append('offerHeadline', offerHeadline);
    formData.append('description', description);
    formData.append('excerptDescription', excerptDescription);
    formData.append('photo', photo);
    formData.append('videoLink', videoLink);
    formData.append('photo2', photo2);
    formData.append('additionalPhoto1', additionalPhoto1);
    formData.append('additionalPhoto2', additionalPhoto2);
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
      alert("Data Added");

      // Reset all input fields after successful submission
      setAppSection('');
      setProductCategory('');
      setBrand('');
      setBrandImage(null);
      setTitle('');
      setOfferHeadline('');
      setDescription('');
      setExcerptDescription('');
      setPhoto(null);
      setPhoto2(null);
      setAdditionalPhoto1(null);
      setAdditionalPhoto2(null);
      setVideoLink('');
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
        }
        
        .form {
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 100%;
        }
        
        .form-group {
          margin-bottom: 15px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 20px;
          font-weight: bold;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 8px;
          height: 40px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        
        .form-group textarea {
          height: auto;
          resize: vertical;
        }
        
        .submit-button {
          background-color: #28a745;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 30px;
          width: 50%;
        }
        
        .submit-button:hover {
          background-color: #218838;
        }

        .image-preview {
          margin-top: 10px;
          max-width: 200px;
          max-height: 200px;
          object-fit: cover;
        }

        .form-group input[type="file"] {
          height: auto;
        }
      `}</style>
      <form onSubmit={handleSubmit} className="form">

        <h2 className="form-heading">Localite Merchant Product Data Form</h2>
        {user && <p>Logged in as: {user.username}</p>}
        <div className="form-group">
          <label>App Section:</label>
          <select value={appSection} onChange={(e) => setAppSection(e.target.value)}>
            <option value="">Select...</option>
            <option value="marketplace">Marketplace</option>
            <option value="offers">Offers</option>
            {/* <option value="free">Free</option> */}
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
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Enter brand name" />
        </div>

        <div className="form-group">
          <label>Upload Brand Image:</label>
          <input className='fimg' type="file" onChange={(e) => setBrandImage(e.target.files[0])} />
          {brandImagePreview && <img src={brandImagePreview} alt="Brand Preview" className="image-preview" />}
        </div>

        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
        </div>

        <div className="form-group">
          <label>Headline:</label>
          <input type="text" value={offerHeadline} onChange={(e) => setOfferHeadline(e.target.value)} placeholder="Enter offer headline" />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
        </div>

        <div className="form-group">
          <label>Excerpt Description:</label>
          <textarea value={excerptDescription} onChange={(e) => setExcerptDescription(e.target.value)} placeholder="Enter excerpt description" />
        </div>

        <div className="form-group">
          <label>Upload Photo:</label>
          <input className='fimg' type="file" onChange={(e) => setPhoto(e.target.files[0])} />
          {photoPreview && <img src={photoPreview} alt="Photo Preview" className="image-preview" />}
        </div>

        <div className="form-group">
          <label>Video Link:</label>
          <input type="text" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} placeholder="Enter video link" />
        </div>

        <div className="form-group">
          <label>Upload 2nd Photo:</label>
          <input className='fimg' type="file" onChange={(e) => setPhoto2(e.target.files[0])} />
          {photo2Preview && <img src={photo2Preview} alt="2nd Photo Preview" className="image-preview" />}
        </div>

        <div className="form-group">
          <label>Upload Additional Photo 1:</label>
          <input className='fimg' type="file" onChange={(e) => setAdditionalPhoto1(e.target.files[0])} />
          {additionalPhoto1Preview && <img src={additionalPhoto1Preview} alt="Additional Photo 1 Preview" className="image-preview" />}
        </div>

        <div className="form-group">
          <label>Upload Additional Photo 2:</label>
          <input className='fimg' type="file" onChange={(e) => setAdditionalPhoto2(e.target.files[0])} />
          {additionalPhoto2Preview && <img src={additionalPhoto2Preview} alt="Additional Photo 2 Preview" className="image-preview" />}
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" />
        </div>

        <div className="form-group">
          <label>Discounted Percentage:</label>
          <input type="text" value={discountedPrice} onChange={(e) => setDiscountedPrice(e.target.value)} placeholder="Enter discounted price" />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </>
  );
};

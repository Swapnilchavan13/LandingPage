import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export const Researchdataentry = () => {
  const { user, logout } = useAuth();
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
  const [entryCount, setEntryCount] = useState(0);

  // Preview states
  const [brandImagePreview, setBrandImagePreview] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [photo2Preview, setPhoto2Preview] = useState('');
  const [additionalPhoto1Preview, setAdditionalPhoto1Preview] = useState('');
  const [additionalPhoto2Preview, setAdditionalPhoto2Preview] = useState('');

  useEffect(() => {
    // Fetch product categories dynamically
    const categories = ['Automotive&Transport', 'Clothing', 'DryCleaningServices', 'EducationandLearning', 'Entertainment&Leisure', 'Food', 'Food&Beverages', 'Handbags', 'Healthcare&Wellness', 'Home&Maintenance', 'Jewellery', 'PersonalCare', 'ProfessionalServices', 'Skin Care'];
    setProductCategories(categories);
  }, []);

  useEffect(() => {
    if (brandImage) {
      setBrandImagePreview(URL.createObjectURL(brandImage));
    } else {
      setBrandImagePreview('');
    }
  }, [brandImage]);

  useEffect(() => {
    if (photo) {
      setPhotoPreview(URL.createObjectURL(photo));
    } else {
      setPhotoPreview('');
    }
  }, [photo]);

  useEffect(() => {
    if (photo2) {
      setPhoto2Preview(URL.createObjectURL(photo2));
    } else {
      setPhoto2Preview('');
    }
  }, [photo2]);

  useEffect(() => {
    if (additionalPhoto1) {
      setAdditionalPhoto1Preview(URL.createObjectURL(additionalPhoto1));
    } else {
      setAdditionalPhoto1Preview('');
    }
  }, [additionalPhoto1]);

  useEffect(() => {
    if (additionalPhoto2) {
      setAdditionalPhoto2Preview(URL.createObjectURL(additionalPhoto2));
    } else {
      setAdditionalPhoto2Preview('');
    }
  }, [additionalPhoto2]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3080/entry-count?username=${user.username}`)
        .then(response => response.json())
        .then(data => setEntryCount(data.count))
        .catch(error => console.error('Error fetching entry count:', error));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to submit data.");
      return;
    }

    if (entryCount >= 3) {
      alert('You can only submit 3 entries per week.');
      return;
    }

    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('appSection', appSection);
    formData.append('productCategory', productCategory);
    formData.append('brand', brand);
    if (brandImage) formData.append('brandImage', brandImage);
    formData.append('title', title);
    formData.append('offerHeadline', offerHeadline);
    formData.append('description', description);
    formData.append('excerptDescription', excerptDescription);
    if (photo) formData.append('photo', photo);
    formData.append('videoLink', videoLink);
    if (photo2) formData.append('photo2', photo2);
    if (additionalPhoto1) formData.append('additionalPhoto1', additionalPhoto1);
    if (additionalPhoto2) formData.append('additionalPhoto2', additionalPhoto2);
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

      // Increment entry count
      incrementEntryCount();
    } catch (err) {
      console.error('Error submitting form', err);
      alert('Error submitting form. Please try again.');
    }
  };

  const incrementEntryCount = () => {
    setEntryCount(prevCount => prevCount + 1);
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
        <p>You have {3 - entryCount} submissions remaining this week.</p>
        <button type="button" onClick={logout}>Logout</button>

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
          <input type="file" onChange={(e) => setBrandImage(e.target.files[0])} />
          {brandImagePreview && <img src={brandImagePreview} alt="Brand Preview" className="image-preview" />}
        </div>

        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
        </div>

        <div className="form-group">
          <label>Offer Headline:</label>
          <input type="text" value={offerHeadline} onChange={(e) => setOfferHeadline(e.target.value)} placeholder="Enter offer headline" />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description"></textarea>
        </div>

        <div className="form-group">
          <label>Excerpt Description:</label>
          <textarea value={excerptDescription} onChange={(e) => setExcerptDescription(e.target.value)} placeholder="Enter excerpt description"></textarea>
        </div>

        <div className="form-group">
          <label>Upload Photo:</label>
          <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
          {photoPreview && <img src={photoPreview} alt="Photo Preview" className="image-preview" />}
        </div>

        <div className="form-group">
          <label>Upload Photo 2:</label>
          <input type="file" onChange={(e) => setPhoto2(e.target.files[0])} />
          {photo2Preview && <img src={photo2Preview} alt="Photo 2 Preview" className="image-preview" />}
        </div>

        <div className="form-group">
          <label>Upload Additional Photo 1:</label>
          <input type="file" onChange={(e) => setAdditionalPhoto1(e.target.files[0])} />
          {additionalPhoto1Preview && <img src={additionalPhoto1Preview} alt="Additional Photo 1 Preview" className="image-preview" />}
        </div>

        <div className="form-group">
          <label>Upload Additional Photo 2:</label>
          <input type="file" onChange={(e) => setAdditionalPhoto2(e.target.files[0])} />
          {additionalPhoto2Preview && <img src={additionalPhoto2Preview} alt="Additional Photo 2 Preview" className="image-preview" />}
        </div>

        <div className="form-group">
          <label>Video Link:</label>
          <input type="text" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} placeholder="Enter video link" />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" />
        </div>

        <div className="form-group">
          <label>Discounted Price:</label>
          <input type="text" value={discountedPrice} onChange={(e) => setDiscountedPrice(e.target.value)} placeholder="Enter discounted price" />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </>
  );
};

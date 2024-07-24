import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categories = [
  'General',
  'Sports',
  'Music',
  'Art',
  'Technology',
  'Education',
  'Gaming',
  'Fashion',
  'Cooking',
  'Other'
];

export const AddGame = () => {
  const [formData, setFormData] = useState({
    title: '',
    likes: 0,
    description: '',
    prize: '',
    winners: 0,
    category: '',
    entryFees: '',
    numberOfEntries: 0,
    organizerName: '',
    startDate: '',
    endDate: '',
    image0: null,
    image1: null,
    image2: null,
    logo: null,
  });

  const [imagePreviews, setImagePreviews] = useState({
    image0: null,
    image1: null,
    image2: null,
    logo: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });

    if (file) {
      setImagePreviews({ ...imagePreviews, [e.target.name]: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });

    axios.post('http://62.72.59.146:3005/games', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(() => navigate('/gamelist'))
      .catch(error => console.error('Error adding game:', error));
  };

  return (
    <div style={{ width: '600px', margin: 'auto' }}>
      <h1>Add New Game</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" placeholder="Title" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="likes">Likes</label>
          <input type="number" id="likes" name="likes" placeholder="Likes" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" placeholder="Description" onChange={handleChange} required></textarea>
        </div>
        <div>
          <label htmlFor="prize">Prize</label>
          <input type="text" id="prize" name="prize" placeholder="Prize" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="winners">Winners</label>
          <input type="number" id="winners" name="winners" placeholder="Winners" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" onChange={handleChange} required>
            <option value="" disabled selected>Select a category</option>
            {categories.map((category, idx) => (
              <option key={idx} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="entryFees">Entry Fees</label>
          <input type="text" id="entryFees" name="entryFees" placeholder="Entry Fees" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="numberOfEntries">Number of Entries</label>
          <input type="number" id="numberOfEntries" name="numberOfEntries" placeholder="Number of Entries" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="organizerName">Organizer Name</label>
          <input type="text" id="organizerName" name="organizerName" placeholder="Organizer Name" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input type="date" id="startDate" name="startDate" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input type="date" id="endDate" name="endDate" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="image0">Image 1</label>
          <input type="file" id="image0" name="image0" onChange={handleFileChange} required />
          {imagePreviews.image0 && <img src={imagePreviews.image0} alt="Preview" style={{ width: '100px', height: '100px' }} />}
        </div>
        <div>
          <label htmlFor="image1">Image 2</label>
          <input type="file" id="image1" name="image1" onChange={handleFileChange} />
          {imagePreviews.image1 && <img src={imagePreviews.image1} alt="Preview" style={{ width: '100px', height: '100px' }} />}
        </div>
        <div>
          <label htmlFor="image2">Image 3</label>
          <input type="file" id="image2" name="image2" onChange={handleFileChange} />
          {imagePreviews.image2 && <img src={imagePreviews.image2} alt="Preview" style={{ width: '100px', height: '100px' }} />}
        </div>
        <div>
          <label htmlFor="logo">Logo</label>
          <input type="file" id="logo" name="logo" onChange={handleFileChange} required />
          {imagePreviews.logo && <img src={imagePreviews.logo} alt="Preview" style={{ width: '100px', height: '100px' }} />}
        </div>
        <button type="submit">Add Game</button>
      </form>
    </div>
  );
};

export default AddGame;

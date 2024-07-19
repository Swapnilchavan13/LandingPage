import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const initialCategories = [
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

const UpdateGame = () => {
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
    image0: null,
    image1: null,
    image2: null,
    logo: null,
  });

  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState('');
  const [imagePreviews, setImagePreviews] = useState({
    image0: null,
    image1: null,
    image2: null,
    logo: null,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3005/games/${id}`)
      .then(response => {
        const data = response.data;
        setFormData({
          ...data,
          image0: null,
          image1: null,
          image2: null,
          logo: null,
        });
        setImagePreviews({
          image0: data.image0 ? `http://localhost:3005/uploads/${data.image0}` : null,
          image1: data.image1 ? `http://localhost:3005/uploads/${data.image1}` : null,
          image2: data.image2 ? `http://localhost:3005/uploads/${data.image2}` : null,
          logo: data.logo ? `http://localhost:3005/uploads/${data.logo}` : null,
        });
      })
      .catch(error => console.error('Error fetching game:', error));
  }, [id]);

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

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setFormData({ ...formData, category: newCategory });
      setNewCategory('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });

    axios.put(`http://localhost:3005/games/${id}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(() => navigate('/gamelist'))
      .catch(error => console.error('Error updating game:', error));
  };

  return (
    <div style={{ width: '600px', margin: 'auto' }}>
      <h1>Update Game</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} placeholder="Title" onChange={handleChange} required />
        </div>
        <div>
          <label>Likes:</label>
          <input type="number" name="likes" value={formData.likes} placeholder="Likes" onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} placeholder="Description" onChange={handleChange} required></textarea>
        </div>
        <div>
          <label>Prize:</label>
          <input type="text" name="prize" value={formData.prize} placeholder="Prize" onChange={handleChange} required />
        </div>
        <div>
          <label>Winners:</label>
          <input type="number" name="winners" value={formData.winners} placeholder="Winners" onChange={handleChange} required />
        </div>
        <div>
          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="" disabled>Select a category</option>
            {categories.map((category, idx) => (
              <option key={idx} value={category}>{category}</option>
            ))}
          </select>
          <div>
            <input
              type="text"
              value={newCategory}
              placeholder="Add new category"
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button type="button" onClick={handleAddCategory}>Add Category</button>
          </div>
        </div>
        <div>
          <label>Entry Fees:</label>
          <input type="text" name="entryFees" value={formData.entryFees} placeholder="Entry Fees" onChange={handleChange} required />
        </div>
        <div>
          <label>Number of Entries:</label>
          <input type="number" name="numberOfEntries" value={formData.numberOfEntries} placeholder="Number of Entries" onChange={handleChange} required />
        </div>
        <div>
          <label>Organizer Name:</label>
          <input type="text" name="organizerName" value={formData.organizerName} placeholder="Organizer Name" onChange={handleChange} required />
        </div>
        <div>
          <label>Image 1:</label>
          <input type="file" name="image0" onChange={handleFileChange} />
          {/* {<img src={formData.images[0]} alt="Current Image 1" style={{ width: '100px', height: '100px' }} />} */}
        </div>
        <div>
          <label>Image 2:</label>
          <input type="file" name="image1" onChange={handleFileChange} />
          {/* {<img src={formData.images[1]} alt="Current Image 2" style={{ width: '100px', height: '100px' }} />} */}
        </div>
        <div>
          <label>Image 3:</label>
          <input type="file" name="image2" onChange={handleFileChange} />
          {/* {<img src={formData.images[2]} alt="Current Image 3" style={{ width: '100px', height: '100px' }} />} */}
        </div>
        <div>
          <label>Logo:</label>
          <input type="file" name="logo" onChange={handleFileChange} />
          {/* {<img src={formData.logo} alt="Current Logo" style={{ width: '100px', height: '100px' }} />} */}
        </div>
        <button type="submit">Update Game</button>
      </form>
    </div>
  );
};

export default UpdateGame;

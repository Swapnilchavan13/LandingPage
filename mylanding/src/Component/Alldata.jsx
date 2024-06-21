import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Alldata = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [appSection, setAppSection] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productCategories, setProductCategories] = useState([]);
  const baseUrl = 'http://62.72.59.146:3080/';

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://62.72.59.146:3080/formdata');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Fetch product categories dynamically (simulated with a static array for now)
    const categories = ['Automotive&Transport', 'Clothing', 'DryCleaningServices', 'EducationandLearning', 'Entertainment&Leisure', 'Food', 'Food&Beverages', 'Handbags', 'Healthcare&Wellness', 'Home&Maintenance', 'Jewellery', 'PersonalCare', 'ProfessionalServices', 'Skin Care'];
    setProductCategories(categories);
  }, []);

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setAppSection(product.appSection);
    setProductCategory(product.productCategory);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      await axios.put(`http://62.72.59.146:3080/update/${editingProduct._id}`, formData);
      // Refresh the data
      const response = await axios.get('http://62.72.59.146:3080/formdata');
      setProducts(response.data);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Edit Products Details</h1>
      <br />
      <br />
      {editingProduct ? (
        <form  onSubmit={handleUpdate} style={styles.editdiv}>
          <p>Select Type:</p>
          <select value={appSection} onChange={(e) => setAppSection(e.target.value)} name="appSection" style={styles.input} required>
            <option value="">Select...</option>
            <option value="marketplace">Marketplace</option>
            <option value="offers">Offers</option>
            <option value="free">Free</option>
          </select>
<p>Select Category:</p>
          <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)} name="productCategory" style={styles.input} required>
            <option value="">Select...</option>
            {productCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
<p>Enter Brand name:</p>
          <input type="text" name="brand" defaultValue={editingProduct.brand}  />
<p>Enter Title:</p>

          <input type="text" name="title" defaultValue={editingProduct.title}  />
          <p>Enter Headline:</p>
          <input type="text" name="offerHeadline" defaultValue={editingProduct.offerHeadline}  />
          <p>Enter Description</p>
          <textarea style={{width:"800px", height:"100px"}} name="description" defaultValue={editingProduct.description}  />
          <br />
          <p>Enter Excerpt Description</p>

          <textarea style={{width:"800px", height:"100px"}} name="excerptDescription" defaultValue={editingProduct.excerptDescription}  />
          {/* <input type="file" name="photo" /> */}
          {/* <input type="file" name="photo2" /> */}
          <p>Enter Video Link</p>
          <input type="text" name="videoLink" defaultValue={editingProduct.videoLink}  />
          <p>Enter Price</p>
          
          <input type="number" name="price" defaultValue={editingProduct.price}  />
          <p>Enter Discounted Price</p>
          
          <input type="number" name="discountedPrice" defaultValue={editingProduct.discountedPrice}  />
          <br />
          <br />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
        </form>
      ) : (
        <div style={styles.productList}>
          {products.map((product) => (
            <div key={product._id} style={styles.productCard}>
              <h3 style={styles.offerHeadline}>{product.appSection}</h3>
              <h3 style={styles.offerHeadline}>Brand: {product.brand}</h3>
              <h2 style={styles.productTitle}>Title: {product.title}</h2>
              <h3 style={styles.offerHeadline}>Headline: {product.offerHeadline}</h3>
              <p style={styles.description}>Description: {product.description}</p>
              <p style={styles.excerptDescription}>Excerpt Description: {product.excerptDescription}</p>
              <div style={styles.imageContainer}>
                <img src={`${baseUrl}${product.photo}`} alt={product.title} style={styles.image} />
                <img src={`${baseUrl}${product.photo2}`} alt={product.title} style={styles.image} />
              </div>
              <p style={styles.offerHeadline}>{product.videoLink}</p>
              <p style={styles.price}>Price: Rs.{product.price}</p>
              <p style={styles.discountedPrice}>Discounted Price: Rs.{product.discountedPrice}</p>
              <button onClick={() => handleEditClick(product)}>Edit</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {

  editdiv:{
  textAlign:'left',
  backgroundcolor: "red"
  },
 
  container: {
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '2em',
    margin: '20px 0',
    color: '#333',
  },
  productList: {
    justifyContent: 'space-around',
  },
  productCard: {
    margin:'auto',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  productTitle: {
    fontSize: '1.5em',
    color: '#333',
  },
  offerHeadline: {
    fontSize: '1.2em',
    color: '#e74c3c',
  },
  description: {
    fontSize: '1em',
    color: '#666',
  },
  excerptDescription: {
    fontSize: '0.9em',
    color: '#999',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    margin: '10px 0',
  },
  image: {
    width: '300px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  price: {
    fontSize: '1em',
    color: '#333',
  },
  discountedPrice: {
    fontSize: '1.2em',
    color: '#27ae60',
  },
};


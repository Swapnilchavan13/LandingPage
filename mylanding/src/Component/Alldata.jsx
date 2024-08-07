import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Alldata = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [appSection, setAppSection] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productCategories, setProductCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [brands, setBrands] = useState([]);
  const baseUrl = 'https://localitebackend.localite.services/';

  useEffect(() => {
    // Fetch the data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localitebackend.localite.services/formdata');
        setProducts(response.data);
        const uniqueBrands = [...new Set(response.data.map(product => product.brand))];
        setBrands(uniqueBrands);
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
      await axios.put(`https://localitebackend.localite.services/update/${editingProduct._id}`, formData);
      // Refresh the data
      const response = await axios.get('https://localitebackend.localite.services/formdata');
      setProducts(response.data);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const filteredProducts = selectedBrand
    ? products.filter((product) => product.brand === selectedBrand)
    : products;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Edit Products Details</h1>
      <br />
      <br />
      <select
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
        style={styles.searchInput}
      >
        <option value="">Select a brand</option>
        {brands.map((brand, index) => (
          <option key={index} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      {editingProduct ? (
        <form onSubmit={handleUpdate} style={styles.editdiv}>
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
          <input type="text" name="brand" defaultValue={editingProduct.brand} />
          <p>Enter Title:</p>
          <input type="text" name="title" defaultValue={editingProduct.title} />
          <p>Enter Headline:</p>
          <input type="text" name="offerHeadline" defaultValue={editingProduct.offerHeadline} />
          <p>Enter Description</p>
          <textarea style={{ width: "800px", height: "100px" }} name="description" defaultValue={editingProduct.description} />
          <br />
          <p>Enter Excerpt Description</p>
          <textarea style={{ width: "800px", height: "100px" }} name="excerptDescription" defaultValue={editingProduct.excerptDescription} />
          <p>Enter Video Link</p>
          <input type="text" name="videoLink" defaultValue={editingProduct.videoLink} />
          <p>Enter Price</p>
          <input type="number" name="price" defaultValue={editingProduct.price} />
          <p>Enter Discount Percentage</p>
          <input type="number" name="discountedPrice" defaultValue={editingProduct.discountedPrice} />
          <br />
          <br />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
        </form>
      ) : (
        <div style={styles.productList}>
          {filteredProducts.map((product) => (
            <div key={product._id} style={styles.productCard}>
              <h3 style={styles.offerHeadline}>{product.appSection}</h3>
              <h3 style={styles.offerHeadline}>Brand: {product.brand}</h3>
              <h2 style={styles.productTitle}>Title: {product.title}</h2>
              <h3 style={styles.offerHeadline}>Headline: {product.offerHeadline}</h3>
              <p style={styles.description}>Description: {product.description}</p>
              <p style={styles.excerptDescription}>Excerpt Description: {product.excerptDescription}</p>
              <div style={styles.imageContainer}>
                <img src={`${baseUrl}${product.brandImage}`} alt={product.title} style={styles.image} />
                <img src={`${baseUrl}${product.photo}`} alt={product.title} style={styles.image} />
                <img src={`${baseUrl}${product.photo2}`} alt={product.title} style={styles.image} />
                <img src={`${baseUrl}${product.additionalPhoto1}`} alt={product.title} style={styles.image} />
                <video controls style={{width:"110px"}}>
  <source src={`${baseUrl}${product.additionalPhoto2}`} type="video/mp4" />
  Your browser does not support the video tag.
</video>
              </div>
              <p style={styles.offerHeadline}>{product.videoLink}</p>
              <p style={styles.price}>Units: {product.unit}</p>
              <p style={styles.price}>Price: Rs.{product.price}</p>
              <p style={styles.discountedPrice}>Discounted Percentage: {product.discountedPrice}%</p>
              <button onClick={() => handleEditClick(product)}>Edit</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  editdiv: {
    textAlign: 'left',
    backgroundColor: "red"
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
  searchInput: {
    padding: '10px',
    fontSize: '1em',
    width: '50%',
    margin: '20px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  productList: {
    justifyContent: 'space-around',
  },
  productCard: {
    margin: 'auto',
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
    width: '100%',
    justifyContent: 'center',
    gap: '10px',
    margin: '10px 0',
  },
  image: {
    width: '200px',
    height: '200px',
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

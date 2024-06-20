import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Alldata = () => {
  const [products, setProducts] = useState([]);
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
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>All Products</h1>
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
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
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


import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Firstformdata = () => {
  const [merchants, setMerchants] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredMerchants, setFilteredMerchants] = useState([]);

  useEffect(() => {
    axios.get('https://localitebackend.localite.services/getmerchants')
      .then(response => {
        setMerchants(response.data);
        setFilteredMerchants(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    setFilteredMerchants(
      merchants.filter(merchant =>
        merchant.contactPhoneNumber.includes(search)
      )
    );
  }, [search, merchants]);

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search by mobile number"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={styles.searchInput}
      />
      <div style={styles.merchantCarddiv}>
        {filteredMerchants.map(merchant => (
          <div key={merchant._id} style={styles.merchantCard}>
            <h2>{merchant.businessName}</h2>
            <div style={styles.field}>
              <label style={styles.label}>Business Type:</label>
              <p>{merchant.businessType}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Business Address:</label>
              <p>{merchant.businessAddress}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Contact Email:</label>
              <p>{merchant.contactEmail}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Contact Phone Number:</label>
              <p>{merchant.contactPhoneNumber}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Person Name:</label>
              <p>{merchant.personName} {merchant.lastName}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Username:</label>
              <p>{merchant.username}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Password:</label>
              <p>{merchant.password}</p>
            </div>
            {merchant.profileImage && (
              <div style={styles.field}>
                <label style={styles.label}>Profile Image/Video:</label>
                {merchant.profileImage.endsWith('.mp4') || merchant.profileImage.endsWith('.avi') || merchant.profileImage.endsWith('.mov') || merchant.profileImage.endsWith('.mkv') ? (
                  <video controls width="250" style={styles.media}>
                    <source src={`https://localitebackend.localite.services/${merchant.profileImage}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={`https://localitebackend.localite.services/${merchant.profileImage}`} alt={merchant.businessName} style={styles.media} />
                )}
              </div>
            )}
            <div style={styles.field}>
              <label style={styles.label}>Brand Logo:</label>
              <img src={`https://localitebackend.localite.services/${merchant.brandLogo}`} alt={`${merchant.businessName} logo`} style={styles.media} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Business License:</label>
              <p>{merchant.businessLicense}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>GST Certificate:</label>
              <p>{merchant.gstCertificate}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>PAN Card:</label>
              <p>{merchant.panCard}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Proof of Address:</label>
              <p>{merchant.proofOfAddress}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Operation Hours:</label>
              <p>{merchant.operationHours}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Years of Business:</label>
              <p>{merchant.yearsOfBusiness}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Number of Employees:</label>
              <p>{merchant.numberOfEmployees}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Product Description:</label>
              <p>{merchant.productDescription}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Preferred Categories:</label>
              <p>{merchant.preferredCategories}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Offer Frequency:</label>
              <p>{merchant.offerFrequency}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Specific Requirements:</label>
              <p>{merchant.specificRequirements}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>PAN/TAN Number:</label>
              <p>{merchant.panTanNumber}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>GSTIN:</label>
              <p>{merchant.gstin}</p>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Bank Account Details:</label>
              <p>{merchant.bankAccountDetails}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  searchInput: {
    padding: '10px',
    width: '60%',
    marginBottom: '20px',
    fontSize: '16px',
  },
  merchantCarddiv: {
    display: 'grid',
    gridtemplatecolumn: 'repeat(4, 1fr)',
    gap: '20px',
  },
  merchantCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  field: {
    marginBottom: '40px',
  },
  label: {
    fontWeight: 'bold',
  },
  media: {
    width: '250px',
    height: 'auto',
    display: 'block',
    margin: '10px 0',
  },
};

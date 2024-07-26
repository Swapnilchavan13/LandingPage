import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/firstformdata.css'; // Import the CSS file

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
    <div id="container">
      <h1>First Form Data (Merchant)</h1>
      <input
        type="text"
        placeholder="Search by mobile number"
        value={search}
        onChange={e => setSearch(e.target.value)}
        id="searchInput"
      />
      <div id="merchantCarddiv">
        {filteredMerchants.map(merchant => (
          <div key={merchant._id} id="merchantCard">
            <h2>{merchant.businessName}</h2>
            <div id="field">
              <label id="label">Business Type:</label>
              <p>{merchant.businessType}</p>
            </div>
            <div id="field">
              <label id="label">Business Address:</label>
              <p>{merchant.businessAddress}</p>
            </div>
            <div id="field">
              <label id="label">Contact Email:</label>
              <p>{merchant.contactEmail}</p>
            </div>
            <div id="field">
              <label id="label">Contact Phone Number:</label>
              <p>{merchant.contactPhoneNumber}</p>
            </div>
            <div id="field">
              <label id="label">Person Name:</label>
              <p>{merchant.personName} {merchant.lastName}</p>
            </div>
            <div id="field">
              <label id="label">Username:</label>
              <p>{merchant.username}</p>
            </div>
            <div id="field">
              <label id="label">Password:</label>
              <p>{merchant.password}</p>
            </div>
            {merchant.profileImage && (
              <div id="field">
                <label id="label">Profile Image/Video:</label>
                {merchant.profileImage.endsWith('.mp4') || merchant.profileImage.endsWith('.avi') || merchant.profileImage.endsWith('.mov') || merchant.profileImage.endsWith('.mkv') ? (
                  <video controls width="250" id="media">
                    <source src={`https://localitebackend.localite.services/${merchant.profileImage}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={`https://localitebackend.localite.services/${merchant.profileImage}`} alt={merchant.businessName} id="media" />
                )}
              </div>
            )}
            <div id="field">
              <label id="label">Brand Logo:</label>
              <img src={`https://localitebackend.localite.services/${merchant.brandLogo}`} alt={`${merchant.businessName} logo`} id="media" />
            </div>
            <div id="field">
              <label id="label">Business License:</label>
              <p>{merchant.businessLicense}</p>
            </div>
            <div id="field">
              <label id="label">GST Certificate:</label>
              <p>{merchant.gstCertificate}</p>
            </div>
            <div id="field">
              <label id="label">PAN Card:</label>
              <p>{merchant.panCard}</p>
            </div>
            <div id="field">
              <label id="label">Proof of Address:</label>
              <p>{merchant.proofOfAddress}</p>
            </div>
            <div id="field">
              <label id="label">Operation Hours:</label>
              <p>{merchant.operationHours}</p>
            </div>
            <div id="field">
              <label id="label">Years of Business:</label>
              <p>{merchant.yearsOfBusiness}</p>
            </div>
            <div id="field">
              <label id="label">Number of Employees:</label>
              <p>{merchant.numberOfEmployees}</p>
            </div>
            <div id="field">
              <label id="label">Brand Description:</label>
              <p>{merchant.productDescription}</p>
            </div>
            <div id="field">
              <label id="label">Preferred Categories:</label>
              <p>{merchant.preferredCategories}</p>
            </div>
            <div id="field">
              <label id="label">Offer Frequency:</label>
              <p>{merchant.offerFrequency}</p>
            </div>
            <div id="field">
              <label id="label">Specific Requirements:</label>
              <p>{merchant.specificRequirements}</p>
            </div>
            <div id="field">
              <label id="label">PAN/TAN Number:</label>
              <p>{merchant.panTanNumber}</p>
            </div>
            <div id="field">
              <label id="label">GSTIN:</label>
              <p>{merchant.gstin}</p>
            </div>
            <div id="field">
              <label id="label">Bank Account Details:</label>
              <p>{merchant.bankAccountDetails}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

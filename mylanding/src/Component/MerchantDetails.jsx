import React, { useState } from 'react';

export const MerchantDetails = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    businessType: '',
    contactNumber: '',
    email: '',
    address: '',
    website: '',
    gstNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Add API call or submission logic here
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>Merchant Onboarding Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Business Name */}
        <div style={{ marginBottom: '15px' }}>
          <label>Business Name:</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Enter business name"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Owner Name */}
        <div style={{ marginBottom: '15px' }}>
          <label>Owner Name:</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            placeholder="Enter owner name"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Business Type */}
        <div style={{ marginBottom: '15px' }}>
          <label>Business Type:</label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="">Select business type</option>
            <option value="Retail">Retail</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Service">Service</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Contact Number */}
        <div style={{ marginBottom: '15px' }}>
          <label>Contact Number:</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter contact number"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Address */}
        <div style={{ marginBottom: '15px' }}>
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter business address"
            required
            rows="3"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          ></textarea>
        </div>

        {/* Website */}
        <div style={{ marginBottom: '15px' }}>
          <label>Website (optional):</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Enter website URL"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* GST Number */}
        <div style={{ marginBottom: '15px' }}>
          <label>GST Number:</label>
          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            placeholder="Enter GST number"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

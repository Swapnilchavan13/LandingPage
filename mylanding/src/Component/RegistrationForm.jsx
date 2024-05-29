import React, { useEffect, useState } from "react";
import "../styles/register.css";

export const RegistrationForm = () => {

  const [pincity, setPincity] = useState("");

  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    cardID: generateCardId(),
    emailID: "",
    address: "",
    pinCode: "",
    city: pincity,
    dateOfBirth: "",
    dateTime: "",
    languageSpoken:"",
    loginPIN: null,
    brand:"",
    photo:"",
  });

  const [showPreview, setShowPreview] = useState(false);
  const [brandData, setBrandData] = useState([]);
  const [confirmPin, setConfirmPin] = useState("");
  const [pincode, setPincode] = useState("");

  const ldate = new Date();
  const formattedDate = ldate.toISOString().slice(0, 10);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  

  useEffect(() => {
    fetch(`https://api.postalpincode.in/pincode/${formData.pinCode}`)
    .then(response => response.json())
    .then(data => {
      // const firstPostOffice = data.PostOffice[0];
      const city = data[0].PostOffice[0].District;
      setPincity(city);
    })
    .catch(error => {
      console.error('Error fetching brand data:', error);
    });

  }, [formData.pinCode]);
  

    useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      city: pincity,
    }));
  }, [pincity]);

  const handleConfirmPinChange = (e) => {
    setConfirmPin(e.target.value);
  };

  useEffect(() => {
    fetch('http://97.74.94.109:4121/getbranddetails')
      .then(response => response.json())
      .then(data => {
        setBrandData(data.brandDetails);
      })

      .catch(error => {
        console.error('Error fetching brand data:', error);
      });
  }, []);

 
  
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      // Convert the image file to a Blob object
      const blob = new Blob([reader.result], { type: file.type });
      setFormData({
        ...formData,
        photo: blob,
      });
    };
  
    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.photo) {
      alert("Please select a profile image");
      return; // Exit the function early
    }

    if (formData.loginPIN === confirmPin) {
      setShowPreview(true);
    } else {
      alert("PIN and confirm PIN do not match");
    }
  };

  const handleConfirmAndSave = async () => {
    // Save formData to localStorage
    localStorage.setItem("registrationData", JSON.stringify(formData));
    // Clear form data or perform any additional action if needed
  
    if (showPreview) {
      try {
        const response = await fetch('http://97.74.94.109:4121/registerUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          // Redirect to the specified link after successful registration
          window.location.href = 'https://play.google.com/store/apps/details?id=com.supercell.clashofclans';
        } else {
          console.error('Error occurred while registering user:', response.statusText);
          // Handle non-2xx responses appropriately
        }
      } catch (error) {
        console.error('Error occurred while registering user:', error);
        // Handle network or other errors appropriately
      }
    }
    
    // Log formData after fetch request
    console.log(formData);
  
    // Reset form data
    setFormData({
      userName: "",
      phoneNumber: "",
      cardID: generateCardId(),
      address: "",
      emailID: "",
      pinCode: "",
      dateTime: "",
      city: pincity,
      dateOfBirth: "",
      photo:"",
      languageSpoken:"",
      loginPIN: null,
      brand: "",
    });
    setShowPreview(false);
    setConfirmPin("");
    alert("Data Saved");
  };
  
  
  // Function to generate a random 9-digit card ID
  function generateCardId() {
    return Math.floor(100000000 + Math.random() * 900000000);
  }

  return (
    <div className="registration-form">
      <div className="header">
        <img src="01Stree.png" width="280px" alt="" />
      </div>
      <h3>Registration Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
  <label htmlFor="phoneNumber">Phone Number:</label>
  <input
  type="tel"
  id="phoneNumber"
  name="phoneNumber"
  value={formData.phoneNumber}
  onChange={handleChange}
  pattern="[0-9]{10}"
  maxLength="10"
  required
  onInput={(e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  }}
/>

</div>

        <div className="form-group">
          <label htmlFor="cardID">Card ID:</label>
          <input
            type="text"
            id="cardID"
            name="cardID"
            value={formData.cardID}
            readOnly
          />
        </div>
        <div className="form-group">
  <label htmlFor="emailID">Email ID:</label>
  <input
    type="email"
    id="emailID"
    name="emailID"
    value={formData.emailID}
    onChange={handleChange}
    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    required
  />
  {!isValidEmail(formData.emailID) && (
    <p style={{ color: 'red' }}>Please enter a valid email address</p>
  )}
</div>


        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pinCode">Pin Code:</label>
          <input
            type="text"
            id="pinCode"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            pattern="[0-9]{6}"
            maxLength="6"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={pincity}
            onChange={handleChange}
            readOnly
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
  <label htmlFor="languageSpoken">Language Spoken:</label>
  <select
    id="languageSpoken"
    name="languageSpoken"
    value={formData.languageSpoken}
    onChange={handleChange}
    required
  >
    <option value="">Select Language</option>
    <option value="Hindi">Hindi</option>
    <option value="English">English</option>
    <option value="Marathi">Marathi</option>
  </select>
</div>

        <div className="form-group">
        <label htmlFor="brand">Brand:</label>
        <select
          id="brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        >
          <option value="">Select Brand</option>
          {brandData.map(brand => (
            <option key={brand.id} value={brand.brandName}>
              {brand.brandName}
            </option>
          ))}
        </select>
      </div>
        {/* <div className="form-group">
          <label htmlFor="dateTime">Date Time:</label>
          <input
            type="datetime-local"
            id="dateTime"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            required
          />
        </div> */}
        <div className="form-group">
  <label className="upload" htmlFor="userPhoto">
    Upload User Photo +
  </label>
  <input
    type="file"
    id="userPhoto"
    name="userPhoto"
    onChange={handlePhotoChange}
    accept="image/*"
    style={{ display: 'none' }}
    required
  />
  {formData.photo ? (
    <img
      src={URL.createObjectURL(formData.photo)}
      alt="User"
      className="user-photo"
    />
  ) : (
    <label id="uploadimg" className="upload" htmlFor="userPhoto">
      <img
        src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
        alt="Default User"
        className="user-photo"
      />
    </label>
  )}
  <br />
  <div className="form-group">
          <label htmlFor="pin">PIN:</label>
          <input
            type="password"
            id="loginPIN"
            name="loginPIN"
            value={formData.loginPIN}
            onChange={handleChange}
            maxLength={4}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPin">Confirm PIN:</label>
          <input
            type="password"
            id="confirmPin"
            name="confirmPin"
            value={confirmPin}
            onChange={handleConfirmPinChange}
            maxLength={4}
            required
          />
        </div>
</div>
    <button type="submit">Submit & Preview</button>
</form>

    {/* Preview section */}
{showPreview && (
  <div className="preview-section">
    <h3>Preview</h3>
    <div className="card">
      <div className="card-content">
        <div className="fdiv">
          <img
            style={{ width: "230px", marginBottom: "-20px" }}
            src="StreeLogo.png"
            alt="Stree Logo"
          />
          <h4>{formData.userName}</h4>
          <p style={{ marginTop: '-20px' }}>Member From: {formattedDate}</p>
          <img
            style={{ width: "70px" }}
            src="https://www.hellotech.com/guide/wp-content/uploads/2020/05/HelloTech-qr-code.jpg"
            alt="qr"
          />
          <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
            {formData.cardID}
          </p>
        </div>
        <div>
          <img
            style={{ width: "70px", marginLeft: "10px" }}
            src="https://rukminim2.flixcart.com/image/850/1000/xif0q/digital-voucher-code/t/i/s/-original-imagn3acm5rja4bw.jpeg?q=90&crop=false"
            alt="Stree Logo"
          />
          {formData.photo && (
            <img
              src={URL.createObjectURL(formData.photo)} // Use createObjectURL to display the Blob image
              alt="User"
              className="user-photo"
            />
          )}
        </div>
      </div>
    </div>
    <br />
    <button onClick={handleConfirmAndSave}>Confirm & Save</button>
  </div>
)}

    </div>
  );
};

export default RegistrationForm;

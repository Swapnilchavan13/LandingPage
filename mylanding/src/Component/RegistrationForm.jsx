import React, { useEffect, useState, useRef  } from "react";
import axios from "axios";
import SHA256 from "crypto-js/sha256";

import "../styles/register.css";

export const RegistrationForm = () => {
  const targetRef = useRef(null);
  const [pincity, setPincity] = useState("");
  const [areaname, setAreaname] = useState("");

  const [otp, setOtp] = useState(""); // State to store the OTP input by the user
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false); // State to track OTP verification

  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    cardID: generateCardId(),
    emailID: "",
    address: "",
    pinCode: "",
    city: pincity,
    area: areaname,
    dateOfBirth: "",
    dateTime: "",
    languageSpoken: "",
    loginPIN: null,
    brand: "Loreal Paris",
    photo: "",
    activate: false
  });

  const [showPreview, setShowPreview] = useState(false);
  const [brandData, setBrandData] = useState([]);
  const [confirmPin, setConfirmPin] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobileNumber, setMobileno] = useState("");

  const ldate = new Date();
  const formattedDate = ldate.toISOString().slice(0, 10);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "phoneNumber" ? formatPhoneNumber(value) : value,
    });

    if (name === "phoneNumber") {
      setMobileno(formatPhoneNumber(value));
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    fetch(`https://api.postalpincode.in/pincode/${formData.pinCode}`)
      .then((response) => response.json())
      .then((data) => {
        const city = data[0].PostOffice[0].District;
        const area = data[0].PostOffice[0].Name;

        setPincity(city);
        setAreaname(area);
      })
      .catch((error) => {
        console.error("Error fetching brand data:", error);
      });
  }, [formData.pinCode]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      city: pincity,
      area: areaname
    }));
  }, [pincity]);

  const handleConfirmPinChange = (e) => {
    setConfirmPin(e.target.value);
  };

  useEffect(() => {
    fetch("http://97.74.94.109:4020/getbranddetails")
      .then((response) => response.json())
      .then((data) => {
        setBrandData(data.brandDetails);
      })
      .catch((error) => {
        console.error("Error fetching brand data:", error);
      });
  }, []);

  const sendOTP = async () => {

    setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000); // 2000 milliseconds = 2 seconds
    try {
      const response = await axios.post("http://97.74.94.109:4020/send-otp", {
        mobileNumber,
      });

      const { message } = response.data;
      setMessage(`${message}`);
      setOtpSent(true);
    } catch (error) {
      console.error(error);
      setMessage("Failed to send OTP. Please try again later.");
    }
  };

  const verifyOTP = async () => {

    setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000); // 2000 milliseconds = 2 seconds
    try {
      const response = await axios.post("http://97.74.94.109:4020/verify-otp", {
        mobileNumber,
        otp,
      });

      const { message } = response.data;
      setMessage(message);

        // Check the status code and handle accordingly
    if (response.status === 200) {
      setMessage(response.data.message);
      setOtpVerified(true); // Set OTP verified to true if successful
      alert("Received OTP from backend:", response.data.otp);
      console.log("OTP verified successfully:", response.data.message);

     
      
    } else {
      setMessage(response.data.message || "Failed to verify OTP.");
      console.log("OTP verification failed:", response.data.message);
    }
  } catch (error) {
    console.error("Error during OTP verification:", error);
    setMessage("Failed to verify OTP. Please try again later.");
  }
};

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

     setTimeout(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, 1000);

    if (!otpVerified) {
      alert("Please verify OTP before submitting the form");
      return;
    }

    if (!formData.photo) {
      alert("Please select a profile image");
      return; // Exit the function early
    }

    if (formData.loginPIN === confirmPin) {
      setFormData((prevData) => ({
        ...prevData,
        phoneNumber: formatPhoneNumber(prevData.phoneNumber),
      }));
      setShowPreview(true);
    } else {
      alert("PIN and confirm PIN do not match");
    }
  };

 const handleConfirmAndSave = async () => {
  // Hash the loginPIN before saving formData
  const hashedLoginPIN = SHA256(formData.loginPIN).toString();
  const formDataWithHashedPIN = { ...formData, loginPIN: hashedLoginPIN };

  // Save formData to localStorage
  localStorage.setItem("registrationData", JSON.stringify(formDataWithHashedPIN));
  // Clear form data or perform any additional action if needed

  if (showPreview) {
    try {
      const response = await fetch("http://97.74.94.109:4020/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithHashedPIN),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setOtpVerified(false);
        alert("Successfully Registered");
        // Redirect to the specified link after successful registration
        // window.location.href = 'https://play.google.com/store/apps/details?id=com.supercell.clashofclans';
      } else if (response.status === 409) {
        // Handle duplicate entry error
        alert("Duplicate entry detected for mobile number, username, or email.");
        window.location.reload(false); // Reload the page
      } else {
        console.error(
          "Error occurred while registering user:",
          response.statusText
        );
        // Handle other non-2xx responses appropriately
      }
    } catch (error) {
      console.error("Error occurred while registering user:", error);
      // Handle network or other errors appropriately
    }
  }
  // Log formData after fetch request
  console.log(formDataWithHashedPIN);

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
    area: areaname,
    dateOfBirth: "",
    photo: "",
    languageSpoken: "",
    loginPIN: null,
    brand: "Loreal Paris",
  });
  setShowPreview(false);
  setConfirmPin("");
  setOtpSent(false);
  setOtpVerified(false); // Reset OTP verification status

  
};


  // Function to generate a random 9-digit card ID
  function generateCardId() {
    return Math.floor(100000000 + Math.random() * 900000000);
  }

  // Function to format the phone number with "91" prefix
  function formatPhoneNumber(phoneNumber) {
    if (phoneNumber.startsWith("91")) {
      return phoneNumber;
    } else {
      return "91" + phoneNumber;
    }
  }

  return (
    <div className="registration-form">
    
      <div className="header">
        <img src="blue-logo.png" width="280px" alt="" />
      </div>
      <h3>Registration Form</h3>
      <p style={{textAlign:'left', padding:'10px'}}>Dear User,<br />
      <br />
Thank you for downloading our app!
<br />
This is the app BY a Locality, OF a Locality and FOR a Locality. Our team works with businesses, shops, restaurants and services in very specific localities - to bring 1,000's of offers worth lakhs of rupees, for our members.<br />
Since the offers, free goods and gifts are exclusively meant for residents of a particular area - the usage of the Localite app is restricted only to our members. Should you wish to join the rapidly expanding community of Localites, please apply for our membership by clicking the link below. Please note that the membership is COMPLETELY FREE - but, will is granted after a
verification that you are genuinely a bonafide resident of the locality.
<br />After that, you can go ahead and enjoy all the valuable gifts that we have for you!
<br />
<br />
We look forward to your application!
<br />
<br />
Team Localite.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            placeholder="What other Localite will know you as"
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
            placeholder="This will be your login ID"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            pattern="[0-9]{12}"
            maxLength="12"
            required
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
          {/* <button type="button" onClick={sendOTP} disabled={otpSent}>
            Get OTP
          </button> */}
        </div>
        
        <div className="form-group">
          <label htmlFor="emailID">Email ID:</label>
          <input
            type="email"
            placeholder="Your varification and receipts will be sent here"
            id="emailID"
            name="emailID"
            value={formData.emailID}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            placeholder="Your membership card & deliveries will be sent here"
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
            placeholder="Your Localite area depends on this"
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
          <label htmlFor="area">Area Name:</label>
          <input
            type="text"
            id="area"
            name="area"
            value={areaname}
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
        {/* <div className="form-group">
          <label htmlFor="brand">Brand:</label>
          <select
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          >
            <option value="">Select Brand</option>
            {brandData.map((brand) => (
              <option key={brand.id} value={brand.brandName}>
                {brand.brandName}
              </option>
            ))}
          </select>
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
            style={{ display: "none" }}
            
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
        </div>
        <div className="form-group">
          <label htmlFor="loginPIN">Set Login PIN:</label>
          <input
            type="password"
            placeholder="This unlocks your app"
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
        <button type="button" onClick={sendOTP} disabled={otpSent}>
            Get OTP
          </button>
          {otpSent && (
          <div className="form-group">
            <label htmlFor="otp">Enter OTP:</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <br />
            <button type="button" onClick={verifyOTP}>
              Verify OTP
            </button>
          </div>
        )}
          <p>{message}</p>
          {otpVerified && (
  <button type="submit">Submit & Preview</button>
)}

  </form>
      {/* Preview section */}
      {showPreview && (
        <div  className="preview-section">
          <h3>Your Localite Card will look like this</h3>
          <div className="card">
            <div className="card-content">
              <div className="fdiv">
                <img
                  style={{ width: "230px", marginBottom: "-20px" }}
                  src="localitelogo-b.png"
                  alt="Stree Logo"
                />
                <h4>{formData.userName}</h4>
                <p style={{ marginTop: "-20px" }}>Member From: {formattedDate}</p>
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
                <div
                  style={{
                    width: "80px",
                    border: "5px solid black",
                    height: "50px",
                    borderRadius: "10px",
                  }}
                >
                  <img
                    style={{ width: "70px", marginLeft: "10px" }}
                    src=""
                    alt=""
                  />
                </div>
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
<div ref={targetRef}></div>
    </div>
  );
};

export default RegistrationForm;

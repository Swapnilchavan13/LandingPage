import React, { useState } from 'react';
import axios from 'axios';

function EmailVerification() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const sendOtp = () => {
    axios.post('http://localhost:3005/sendotpemail', { email })
      .then(response => {
        console.log(response.data);
        setIsOtpSent(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const verifyOtp = () => {
    axios.post('http://localhost:3005/verifyotpemail', { otp, enteredOTP: otp })
      .then(response => {
        console.log(response.data);
        setVerificationStatus('OTP verified successfully');
      })
      .catch(error => {
        console.error(error);
        setVerificationStatus('Invalid OTP');
      });
  };

  return (
    <div>
      <h2>Email Verification</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
      </div>
      {!isOtpSent ? (
        <button onClick={sendOtp}>Send OTP</button>
      ) : (
        <div>
          <div>
            <label htmlFor="otp">Enter OTP:</label>
            <input type="text" id="otp" value={otp} onChange={handleOtpChange} />
          </div>
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
      <p>{verificationStatus}</p>
    </div>
  );
}

export default EmailVerification;

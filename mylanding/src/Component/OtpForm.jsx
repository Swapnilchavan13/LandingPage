import React, { useState } from 'react';
import axios from 'axios'; // For making HTTP requests

function OTPForm() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(""); // State to store the OTP input by the user
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false); // State to check if OTP is sent

  const sendOTP = async () => {
      try {
          const response = await axios.post("http://localhost:3008/send-otp", {
              mobileNumber
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
      try {
          const response = await axios.post("http://localhost:3008/verify-otp", {
              mobileNumber,
              otp
          });

          const { message } = response.data;
          setMessage(message);
      } catch (error) {
          console.error(error);
          setMessage("Failed to verify OTP. Please try again later.");
      }
  };

  return (
      <div className="App">
          <h2>Enter Your Mobile Number</h2>
          <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter Mobile Number"
          />
          <button onClick={sendOTP}>Send OTP</button>

          {otpSent && (
              <div>
                  <h2>Enter OTP</h2>
                  <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                  />
                  <button onClick={verifyOTP}>Verify OTP</button>
              </div>
          )}

          <p>{message}</p>
      </div>
  );
}

export default OTPForm;

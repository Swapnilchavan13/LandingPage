// import React, { useState } from 'react';
// import axios from 'axios';

// function OTPForm() {
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [otp, setOTP] = useState('');
//     const [message, setMessage] = useState('');
//     const [showOTPInput, setShowOTPInput] = useState(false);

//     const sendOTP = async () => {
//         try {
//             const response = await axios.post('http://localhost:3005/sendOTP', { phoneNumber });
//             if (response.data.success) {
//                 setMessage('OTP sent successfully');
//                 setShowOTPInput(true);
//                 // Store the phone number in localStorage
//                 localStorage.setItem('phoneNumber', phoneNumber);
//             } else {
//                 setMessage('Failed to send OTP');
//             }
//         } catch (error) {
//             console.error(error);
//             setMessage('Failed to send OTP');
//         }
//     };

//     const handleVerifyOTP = async e => {
//         e.preventDefault();
//         try {
//             const storedPhoneNumber = localStorage.getItem('phoneNumber');

//             const response = await axios.post('http://localhost:3005/verifyOTP', { otp, phoneNumber: storedPhoneNumber });
//             if (response.data.success) {
//                 setMessage('OTP verified successfully');
//                 // You can add further logic here after successful OTP verification
//             } else {
//                 setMessage('Invalid OTP');
//             }
//         } catch (error) {
//             console.error('Error verifying OTP:', error);
//             setMessage('Failed to verify OTP');
//         }
//     };

//     const handleSubmit = e => {
//         e.preventDefault();
//         sendOTP();
//     };

//     return (
//         <div>
//             <br />
//             <br />
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Enter Phone Number"
//                     value={phoneNumber}
//                     onChange={e => setPhoneNumber(e.target.value)}
//                 />
//                 <button type="submit">Send OTP</button>
//             </form>
//             <p>{message}</p>
//             {showOTPInput && (
//                 <form onSubmit={handleVerifyOTP}>
//                     <input
//                         type="text"
//                         placeholder="Enter OTP"
//                         value={otp}
//                         onChange={e => setOTP(e.target.value)}
//                     />
//                     <button type="submit">Verify OTP</button>
//                 </form>
//             )}
//         </div>
//     );
// }

// export default OTPForm;


import React, { useState } from 'react';
import axios from 'axios'; // For making HTTP requests

function OTPForm() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOTP = async () => {
    try {
      const response = await axios.post('http://localhost:3008/send-otp', { mobileNumber });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('Error sending OTP. Please try again.');
    }
  };

  return (
    <div>
      <h2>Send OTP</h2>
      <div>
        <label>Mobile Number:</label>
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </div>
      <button onClick={handleSendOTP}>Send OTP</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OTPForm;


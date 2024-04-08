import React, { useState } from 'react';
import '../styles/clicker.css'; // import the CSS file

export const ClickerInfo = () => {
  const [screenID, setScreenID] = useState('');
  const [IPAddress, setIPAddress] = useState('');
  const [seatNo, setSeatNo] = useState('');
  const [isReplaced, setIsReplaced] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [issueIfReplaced, setIssueIfReplaced] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const handleSubmit = async (event) => {

    console.log({
        screenID,
        IPAddress,
        seatNo,
        isReplaced,
        dateTime,
        issueIfReplaced,
        macAddress,
        isDeleted
      });
      
    event.preventDefault();
    try {
      const response = await fetch('http://192.168.0.113:8012/api/addClickerData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          screenID,
          IPAddress,
          seatNo,
          isReplaced,
          dateTime,
          issueIfReplaced,
          macAddress,
          isDeleted
        }),
      });
      
      if (response.ok) {
        // Reset form fields upon successful submission
        setScreenID('');
        setIPAddress('');
        setSeatNo('');
        setIsReplaced('');
        setDateTime('');
        setIssueIfReplaced('');
        setMacAddress('');
        setIsDeleted(false);
        
        console.log('Data submitted successfully');
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="containerclicker">
      <h2>Clicker Info</h2>
      <form onSubmit={handleSubmit}>
        <label className="label">
          Screen ID:
          <input type="text" className="inputField" value={screenID} onChange={(e) => setScreenID(e.target.value)} />
        </label>
        <label className="label">
          IP Address:
          <input type="text" className="inputField" value={IPAddress} onChange={(e) => setIPAddress(e.target.value)} />
        </label>
        <label className="label">
          Seat No:
          <input type="text" className="inputField" value={seatNo} onChange={(e) => setSeatNo(e.target.value)} />
        </label>
        <label className="label">
          Is Replaced:
          <select className="selectField" value={isReplaced} onChange={(e) => setIsReplaced(e.target.value)}>
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
        <label className="label">
          Date Time:
          <input type="date" className="inputField" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
        </label>
        <label className="label">
          Issue If Replaced:
          <select className="selectField" value={issueIfReplaced} onChange={(e) => setIssueIfReplaced(e.target.value)}>
            <option value="">Select issue</option>
            <option value="1">Issue 1</option>
            <option value="2">Issue 2</option>
            <option value="3">Issue 3</option>
            <option value="4">Issue 4</option>
          </select>
        </label>
        <label className="label">
          Mac Address:
          <input type="text" className="inputField" value={macAddress} onChange={(e) => setMacAddress(e.target.value)} />
        </label>
        <button type="submit" className="submitButton">Submit</button>
      </form>
    </div>
  );
};

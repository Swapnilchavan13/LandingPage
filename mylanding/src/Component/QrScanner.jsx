import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import '../styles/qr.css';

export const QrScannerComponent = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    let html5QrcodeScanner;

    if (showScanner) {
      html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: 250 },
        false
      );

      html5QrcodeScanner.render(handleScan, handleError);
    }

    return () => {
      if (html5QrcodeScanner) {
        html5QrcodeScanner.clear().catch(error => {
          console.error("Failed to clear html5QrcodeScanner", error);
        });
      }
    };
  }, [showScanner]);

  const handleScan = (data) => {
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        const dataArray = Array.isArray(parsedData) ? parsedData : [parsedData];
        setJsonData(dataArray);
      } catch (error) {
        console.error("Failed to parse QR code data as JSON:", error);
      }
      setShowScanner(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleButtonClick = () => {
    setShowScanner(true);
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  const handleConfirmClick = () => {
    const selectedItems = jsonData.filter((item, index) => checkedItems[index]);
    console.log("Selected items:", selectedItems);
    // Add further actions as needed
  };

  const renderDataFields = (item) => {
    if (item.type === "PRODUCT") {
      return (
        <>
          <p><strong>User Name:</strong> {item.username}</p>
          <p><strong>Type:</strong> {item.type}</p>
          <p><strong>Title:</strong> {item.title}</p>
          <p><strong>Brand Name:</strong> {item.brandName}</p>
        </>
      );
    } else if (item.type === "TICKET-BOOKIN") {
      return (
        <>
          <p><strong>User Name:</strong> {item.username}</p>
          <p><strong>Type:</strong> {item.type}</p>
          <p><strong>Movie Name:</strong> {item.movieName}</p>
          <p><strong>Show Date:</strong> {item.showDate}</p>
          <p><strong>Show Time:</strong> {item.showTime}</p>
        </>
      );
    } else if (item.type === "SAMPLE") {
      return (
        <>
          <p><strong>User Name:</strong> {item.username}</p>
          <p><strong>Type:</strong> {item.type}</p>
          <p><strong>Title:</strong> {item.title}</p>
          <p><strong>Brand Name:</strong> {item.brandName}</p>
        </>
      );
    }
    // Handle other types if necessary
    return null;
  };

  return (
    <div className="container">
      <div className="button-group">
        <button onClick={handleButtonClick}>Scan QR Code</button>
      </div>
      
      {showScanner && (
        <div id="qr-reader"></div>
      )}

      {jsonData && (
        <div className="scanned-data">
          <h3>Scanned Data:</h3>
          {jsonData.map((item, index) => (
            <div key={index} className="scanned-item">
              <input
                type="checkbox"
                checked={checkedItems[index] || false}
                onChange={() => handleCheckboxChange(index)}
              />
              <div>
                {renderDataFields(item)}
              </div>
            </div>
          ))}
          <button className="confirm-button" onClick={handleConfirmClick}>Confirm</button>
        </div>
      )}
    </div>
  );
};

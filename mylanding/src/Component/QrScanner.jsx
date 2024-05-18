import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export const QrScannerComponent = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [jsonData, setJsonData] = useState(null);

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
        setJsonData(parsedData);
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

  return (
    <div>
      <button onClick={handleButtonClick}>Ticket Acknowledgment</button>
      <button onClick={handleButtonClick}>Sample Acknowledgment</button>
      <button onClick={handleButtonClick}>Product Acknowledgment</button>
      <button onClick={handleButtonClick}>Offers Acknowledgment</button>
      
      {showScanner && (
        <div id="qr-reader" style={{ width: '100%' }}></div>
      )}

      {jsonData && (
        <div>
          <h3>Scanned Data:</h3>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

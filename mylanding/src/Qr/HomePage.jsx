import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

const seats = [
  { seat: "A1", theater: "T001" },
  { seat: "B2", theater: "T001" },
  { seat: "C3", theater: "T002" },
  { seat: "D4", theater: "T002" },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleQRClick = (seat, theater) => {
    const url = `/order?seat=${seat}&theater=${theater}`;
    navigate(url);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select a Seat - Scan or Click QR</h2>
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {seats.map(({ seat, theater }) => {
          const qrValue = `${window.location.origin}/order?seat=${seat}&theater=${theater}`;
          return (
            <div
              key={seat}
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => handleQRClick(seat, theater)}
            >
              <QRCodeCanvas value={qrValue} size={200} />
              <p>{seat} - {theater}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import '../styles/qrorders.css'; // import the CSS file
 

const menuItems = [
  { name: "Popcorn", price: 100 },
  { name: "Sandwich", price: 150 },
  { name: "Cookie", price: 50 },
  { name: "Coffee", price: 80 },
  { name: "Ice Cream", price: 120 },
];

const OrderPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const seat = params.get("seat");

  const [order, setOrder] = useState({});
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || {};
    if (existingOrders[seat]) {
      setOrder(existingOrders[seat]);
    }
  }, [seat]);

  const handleAdd = (item) => {
    setOrder((prev) => ({
      ...prev,
      [item.name]: (prev[item.name] || 0) + 1,
    }));
  };

  const handleRemove = (item) => {
    setOrder((prev) => {
      const updated = { ...prev };
      if (updated[item.name]) {
        updated[item.name] -= 1;
        if (updated[item.name] <= 0) {
          delete updated[item.name];
        }
      }
      return updated;
    });
  };

  const total = Object.entries(order).reduce((acc, [item, qty]) => {
    const menuItem = menuItems.find((m) => m.name === item);
    return acc + (menuItem?.price || 0) * qty;
  }, 0);

  const handlePlaceOrder = () => {
    const existing = JSON.parse(localStorage.getItem("orders")) || {};
    existing[seat] = order;
    localStorage.setItem("orders", JSON.stringify(existing));
    setShowQR(true);
  };

  return (
    <div className="order-container">
      <h1 className="thankyou">Thank you! 🎉</h1>
      <p className="welcome-msg">Seat Number: <strong>{seat}</strong></p>
      <p className="offer-msg">You get a free Tea ☕ and Biscuit 🍪</p>

      <h2 className="menu-heading">Order More Items</h2>

      <div className="menu">
        {menuItems.map((item) => (
          <div className="menu-item" key={item.name}>
            <div>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>
            <div className="controls">
              <button onClick={() => handleRemove(item)}>-</button>
              <span>{order[item.name] || 0}</span>
              <button onClick={() => handleAdd(item)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="summary">
        <h3>Order Summary</h3>
        {Object.entries(order).length === 0 ? (
          <p>No items selected yet.</p>
        ) : (
          <ul>
            {Object.entries(order).map(([item, qty]) => (
              <li key={item}>
                {item} x {qty}
              </li>
            ))}
          </ul>
        )}
        <p className="total">Total: ₹{total}</p>
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>

      {showQR && (
        <div className="qr-modal">
          <div className="qr-popup">
            <h3>Scan to Pay</h3>
            <QRCodeCanvas value={`upi://pay?pa=dummy@upi&am=${total}`} size={200} />
            <button onClick={() => setShowQR(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;

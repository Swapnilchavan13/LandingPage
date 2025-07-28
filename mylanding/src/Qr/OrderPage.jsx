import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const menu = [
  { item: "Popcorn", price: 50 },
  { item: "Sandwich", price: 40 },
  { item: "Cookie", price: 20 },
  { item: "Coffee", price: 30 },
  { item: "Ice Cream", price: 35 },
];

const OrderPage = () => {
  const [searchParams] = useSearchParams();
  const seat = searchParams.get("seat");
  const theater = searchParams.get("theater");

  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);
  const [paymentQR, setPaymentQR] = useState("");

  useEffect(() => {
    let t = 0;
    menu.forEach((item) => {
      const qty = quantities[item.item] || 0;
      t += qty * item.price;
    });
    setTotal(t);
  }, [quantities]);

  const handleQtyChange = (item, value) => {
    const qty = Math.max(0, parseInt(value) || 0);
    setQuantities((prev) => ({ ...prev, [item]: qty }));
  };

  const handleOrder = () => {
    const orderData = {
      seat,
      theater,
      items: quantities,
      total,
      time: new Date().toLocaleString(),
    };

    const existing = JSON.parse(localStorage.getItem("orders") || "{}");
    existing[seat] = orderData;
    localStorage.setItem("orders", JSON.stringify(existing));

    const paymentString = `PAYMENT|SEAT:${seat}|AMOUNT:${total}`;
    const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(paymentString)}`;
    setPaymentQR(qrUrl);
  };

  if (!seat || !theater) return <h3>Invalid QR Code</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Thank you! Seat No. {seat}</h2>
      <p>You will get your free tea and biscuit.</p>
      <h3>If you'd like to order more, here is the menu:</h3>

      {menu.map((item) => (
        <div key={item.item} style={{ marginBottom: "10px" }}>
          {item.item} (₹{item.price}):{" "}
          <input
            type="number"
            min="0"
            value={quantities[item.item] || ""}
            onChange={(e) => handleQtyChange(item.item, e.target.value)}
            style={{ width: "60px" }}
          />
        </div>
      ))}

      <h4>Total: ₹{total}</h4>
      <button onClick={handleOrder} style={{ padding: "10px", fontSize: "16px" }}>
        Place Order
      </button>

      {paymentQR && (
        <div style={{ marginTop: "20px" }}>
          <h4>Scan to Pay:</h4>
          <img src={paymentQR} alt="Payment QR" />
        </div>
      )}
    </div>
  );
};

export default OrderPage;

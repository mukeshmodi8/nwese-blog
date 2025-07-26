import React, { useEffect, useState } from "react";
import "./SubscribePopup.css"; // <- Add this import

const SubscribePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const subscribed = localStorage.getItem("subscribed");
    if (!subscribed || subscribed === "false") {
      setTimeout(() => {
        setShowPopup(true);
      }, 2000);
    }
  }, []);

  const handleSubscribe = () => {
    localStorage.setItem("subscribed", "true");
    setShowPopup(false);
  };

  const handleClose = () => {
    localStorage.setItem("subscribed", "false");
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="subscribe-popup-container">
      <div className="subscribe-popup-box">
        <h2>🔔 Subscribe Now!</h2>
        <p>Get notified when we post a new blog!</p>
        <button onClick={handleSubscribe} className="subscribe-btn">
          Subscribe
        </button>
        <button onClick={handleClose} className="close-btn">
          Later
        </button>
      </div>
    </div>
  );
};

export default SubscribePopup;

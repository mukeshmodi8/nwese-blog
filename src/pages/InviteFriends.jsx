import React from "react";
import {
  FaWhatsapp,
  FaFacebook,
  FaTelegram,
  FaTwitter,
  FaLink,
} from "react-icons/fa";
import "./InviteFriends.css";

const InviteFriends = () => {
  const pageUrl = "https://happyblogg.com/";
  const shareText = `🔥 टेक्नोलॉजी, ट्रेंड्स और ज़रूरी टिप्स अब आसान हिंदी में!  
👨‍💻 Mr. Happy Blog पर आइए और हर दिन कुछ नया सीखिए।  
👉 पढ़ें अभी!: ${pageUrl}`;

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const telegram = `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pageUrl);
    alert("🔗 Link copied to clipboard!");
  };

  return (
    <div className="invite-container">
      <img
        src="/images/invite-banner.png"
        alt="Invite Your Friends"
        className="invite-top-banner"
      />

      {/* 🔹 Ad Slot - Top */}
      {/* <div className="ad-slot">
        <img src="/ads/ad1.png" alt="Ad 1" />
      </div> */}

      <h2>🎁 Invite Your Friends</h2>
      <p>Share this blog with your friends on your favorite platform:</p>

      <div className="share-buttons">
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp">
          <FaWhatsapp className="icon whatsapp" />
        </a>
        <a href={facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
          <FaFacebook className="icon facebook" />
        </a>
        <a href={telegram} target="_blank" rel="noopener noreferrer" title="Telegram">
          <FaTelegram className="icon telegram" />
        </a>
        <a href={twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
          <FaTwitter className="icon twitter" />
        </a>
        <button onClick={handleCopy} title="Copy Link" className="icon-button">
          <FaLink className="icon link" />
        </button>
      </div>

      {/* 🔹 Ad Slot - Bottom */}
      {/* <div className="ad-slot">
        <img src="/ads/ad3.png" alt="Ad 3" />
      </div> */}
    </div>
  );
};

export default InviteFriends;

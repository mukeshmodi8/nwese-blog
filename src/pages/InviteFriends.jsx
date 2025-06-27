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
  const pageUrl = "https://nwese-blog-5xg5.vercel.app/";
  const shareText = `🔥 Discover amazing blogs on tech, trends & tips. Join me at Mr. Happy's Blog!: ${pageUrl}`;

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
    </div>
  );
};

export default InviteFriends;

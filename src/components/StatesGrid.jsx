import React from "react";
import { NavLink } from "react-router-dom";
import "./StatesGrid.css";

// राज्यों की लिस्ट
const states = [
  { name: "उत्तर प्रदेश", icon: "/icons/uttar-pradesh.svg" },
  { name: "बिहार", icon: "/icons/bihar.svg" },
  { name: "दिल्ली-एनसीआर", icon: "/icons/delhi.svg" },
  { name: "पंजाब", icon: "/icons/punjab.svg" },
  { name: "हरियाणा", icon: "/icons/haryana.svg" },
  { name: "उत्तराखंड", icon: "/icons/uttarakhand.svg" },
  { name: "झारखंड", icon: "/icons/jharkhand.svg" },
  { name: "छत्तीसगढ़", icon: "/icons/chhattisgarh.svg" },
  { name: "मध्य प्रदेश", icon: "/icons/mp.svg" },
  { name: "हिमाचल प्रदेश", icon: "/icons/himachal.svg" },
  { name: "जम्मू-कश्मीर", icon: "/icons/jk.svg" },
  { name: "पश्चिम बंगाल", icon: "/icons/bengal.svg" },
  { name: "ओडिशा", icon: "/icons/odisha.svg" },
  { name: "महाराष्ट्र", icon: "/icons/maharashtra.svg" },
  { name: "राजस्थान", icon: "/icons/rajasthan.svg" },
];

// हेल्पर फ़ंक्शन: नाम को स्लग में बदले
const generateSlug = (name) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0900-\u097F-a-zA-Z0-9-]/g, "");

const StatesGrid = () => {
  return (
    <div className="states-grid">
      {states.map((state) => {
        const slug = generateSlug(state.name);
        return (
          <NavLink key={slug} to={`/state/${slug}`} className="state-item">
            <div className="state-icon">
              <img src={state.icon} alt={state.name} width={50} height={50} />
            </div>
            <div className="state-name">{state.name}</div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default StatesGrid;

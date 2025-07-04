import React from "react";
import "./StatesGrid.css";

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

const StatesGrid = () => {
  return (
    <div className="states-grid">
      {states.map((state) => (
        <NavLink
          key={state.slug}
          to={`/state/${state.slug}`}
          className="state-item"
        >
          <div className="state-icon">{state.icon}</div>
          <div className="state-name">{state.name}</div>
        </NavLink>
      ))}
    </div>
  );
};

export default StatesGrid;